import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES } from '../constants';
import { user } from '../interfaces/user.interface';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {
  private baseUrl = 'http://localhost:3400'; // Default URL, you can change this

  constructor(private http: HttpClient) {
    // Try to get the environment URL if available
    try {
      const environment = require('../../environments/environment');
      this.baseUrl = environment.environment.apiUrl;
    } catch (error) {
      console.warn('Environment file not found, using default baseUrl');
    }
  }

  loginUser(userData: user) {
    return this.http.post(API_ROUTES.BASE_URL + API_ROUTES.LOGIN, userData);
  }

  registerUser(userData: FormData) {
    return this.http.post(API_ROUTES.BASE_URL + API_ROUTES.REGISTER, userData);
  }

  sendOtp(email: string) {
    return this.http.post(API_ROUTES.BASE_URL + API_ROUTES.SEND_OTP, {
      email: email,
    });
  }

  getFeed(length: number) {
    return this.http.get(
      `${API_ROUTES.BASE_URL}${API_ROUTES.FEED}?length=${length}`
    );
  }

  validateOtp(email: string, otp: number) {
    return this.http.post(API_ROUTES.BASE_URL + API_ROUTES.VERIFY_OTP, {
      email: email,
      otp: otp,
    });
  }

  checkForFriends(id: string) {
    return this.http.get(
      `${API_ROUTES.BASE_URL}${API_ROUTES.CHECK_FRIENDS}/${id}`
    );
  }

  getProfileDetails(id: string) {
    return this.http.get(
      `${API_ROUTES.BASE_URL}${API_ROUTES.PROFILE_DETAILS}/${id}`
    );
  }

  userDetails(): Observable<any> {
    return this.http.get(`${this.baseUrl}/auth/userDetails`);
  }

  likeAPost(id: string) {
    return this.http.post(`${API_ROUTES.BASE_URL}${API_ROUTES.LIKE_A_POST}`, {
      postId: id,
    });
  }

  dislikeAPost(id: string) {
    return this.http.delete(
      `${API_ROUTES.BASE_URL}${API_ROUTES.DISLIKE_A_POST}/${id}`
    );
  }

  removeFriends(id: string) {
    return this.http.delete(
      `${API_ROUTES.BASE_URL}${API_ROUTES.REMOVE_FRIEND}/${id}`
    );
  }

  getUsersOnSearchInput(searchedInput: string) {
    return this.http.get(
      `${API_ROUTES.BASE_URL}${API_ROUTES.SEARCH_USERS}/${searchedInput}`
    );
  }

  getFriendRequests() {
    return this.http.get(`${API_ROUTES.BASE_URL}${API_ROUTES.FRIEND_REQUESTS}`);
  }

  acceptFriendRequest(id: string) {
    return this.http.put(
      `${API_ROUTES.BASE_URL}${API_ROUTES.ACCEPT_FRIEND_REQUESTS}?id=${id}`,
      {}
    );
  }

  sendFriendRequest(friendId: string) {
    return this.http.post(`${API_ROUTES.BASE_URL}${API_ROUTES.SEND_REQUEST}`, {
      friendReqUserId: friendId,
    });
  }

  getUserFriends() {
    return this.http.get(
      `${API_ROUTES.BASE_URL}${API_ROUTES.GET_USER_FRIENDS}`
    );
  }

  addPosts(formDataPost: FormData) {
    console.log('ERROR is:', formDataPost);

    return this.http.post(
      `${API_ROUTES.BASE_URL}${API_ROUTES.ADD_POSTS}`,
      formDataPost
    );
  }

  updateThePrivacy() {
    return this.http.put(`${API_ROUTES.BASE_URL}${API_ROUTES.PRIVACY}`, {});
  }

  updatePassword(oldPass: string, newPass: string) {
    return this.http.put(
      `${API_ROUTES.BASE_URL}${API_ROUTES.UPDATE_PASSWORD}`,
      { oldPassword: oldPass, newPassword: newPass }
    );
  }

  getChat(roomName: string, length: number) {
    return this.http.get(
      `${API_ROUTES.BASE_URL}${API_ROUTES.GET_CHAT}?roomName=${roomName}&length=${length}`
    );
  }

  getFriendsLength(id: string) {
    return this.http.get(
      `${API_ROUTES.BASE_URL}${API_ROUTES.FRIENDS_LEN}/${id}`
    );
  }

  addAComment(comment: string, postId: string) {
    return this.http.post(`${API_ROUTES.BASE_URL}${API_ROUTES.ADD_COMMENT}`, {
      postId: postId,
      comment: comment,
    });
  }

  getCommentsOfPost(postId: string, length: number) {
    return this.http.get(
      `${API_ROUTES.BASE_URL}${API_ROUTES.GET_COMMENTS}/${postId}?length=${length}`
    );
  }

  getUserSinglePost(postId: string) {
    return this.http.get(
      `${API_ROUTES.BASE_URL}${API_ROUTES.SINGLE_POST}/${postId}`
    );
  }

  createGroup(name: string) {
    return this.http.post(`${API_ROUTES.BASE_URL}${API_ROUTES.CREATE_GROUP}`, {
      groupName: name,
    });
  }

  getUserGroups() {
    return this.http.get(`${API_ROUTES.BASE_URL}${API_ROUTES.GET_GROUPS}`);
  }

  updatePost(formData: FormData, postId: string) {
    return this.http.put(
      `${API_ROUTES.BASE_URL}${API_ROUTES.UPDATE_POST}/${postId}`,
      formData
    );
  }

  addSocket(socketId: string) {
    return this.http.post(`${API_ROUTES.BASE_URL}${API_ROUTES.ADD_SOCKET}`, {
      socketId: socketId,
    });
  }

  removeSocket(socketId: string) {
    return this.http.delete(
      `${API_ROUTES.BASE_URL}${API_ROUTES.REMOVE_SOCKET}/${socketId}`
    );
  }

  updateProfile(userData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/auth/updateProfile`, userData);
  }
}
