
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';
import { UserProfileDto } from '../models/userprofiledto';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getUserProfile(userId: string): Observable<UserProfileDto> {
    const userProfileUrl = `${this.baseApiUrl}/api/user/user-profile/${userId}`;
    return this.http.get<UserProfileDto>(userProfileUrl);
  }

  // editProfile(profileDto: EditProfileDto, userId: string): Observable<any> {
  //   const editProfileUrl = `${this.baseApiUrl}/api/user/edit-profile?userId=${userId}`;
  //   return this.http.put<any>(editProfileUrl, profileDto);
  // }
}




