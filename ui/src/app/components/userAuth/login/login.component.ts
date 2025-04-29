import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiCallsService } from '../../../services/api-calls.service';
import { SweetAlertService } from '../../../services/sweet-alert.service';
import { ROUTES_UI } from '../../../constants';
import { CommonFunctionsAndVarsService } from '../../../services/common-functions-and-vars.service';
import { SocketEventsService } from '../../../services/socket-events.service';
import { JsonPipe } from '@angular/common';
import { noWhitespaceValidator } from '../../../validators/no-white-space-validator';
import { user } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, JsonPipe],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showPassword: boolean = false;
  loginError: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiCalls: ApiCallsService,
    private sweetAlert: SweetAlertService,
    private commonFunctions: CommonFunctionsAndVarsService,
    private sockets: SocketEventsService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), noWhitespaceValidator()]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), noWhitespaceValidator()]]
    });
  }

  ngOnInit(): void {
    // Check if user is already logged in by checking sessionStorage
    const token = sessionStorage.getItem('token');
    if (token) {
      this.router.navigate(['/feed']);
    }
  }

  // Getter methods for form controls
  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.sweetAlert.error('Form is Invalid !!');
      return;
    }

    const userToLogin: user = {
      username: this.loginForm.controls['username'].value,
      password: this.loginForm.controls['password'].value,
    };

    this.apiCalls.loginUser(userToLogin).subscribe({
      next: (data: any) => {
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('userId', data.userId);

        this.sockets.connectUser();
        this.sockets.selectedUser.set(`${data.userId}`);
        this.commonFunctions.showNavbar.next(true);

        this.router.navigate([ROUTES_UI.FEED]);
      },
      error: (err) => {
        if (err.status === 421) {
          sessionStorage.setItem('email', err.error.email);

          this.apiCalls.sendOtp(err.error.email).subscribe({
            next: (data) => {
              this.sweetAlert.success('Otp sent successfully');
              this.router.navigate([ROUTES_UI.OTP_TEST]);
            },
            error: (err) => {
              console.log('ERROR IS:', err);
              this.sweetAlert.error('Error sending OTP !!');
            },
          });
        }
        console.log('ERROR IS :', err);
        this.sweetAlert.error('First Verify your account !!');
      },
    });
  }
}
