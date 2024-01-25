import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Member } from '../models/member';
import { map, of } from 'rxjs';
import { PaginatedResult } from '../models/pagination';
import { User } from '../models/user';
import { UserFilterParams } from '../models/userFilterParams';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  // paginatedResult: PaginatedResult<Member[]> = new PaginatedResult<Member[]>();

  private http = inject(HttpClient);

  getMembers(userFilterParams: UserFilterParams) {
    let params = new HttpParams();
    params = params.append('pageNumber', userFilterParams.page);
    params = params.append('pageSize', userFilterParams.itemsPerPage);

    return this.getPaginatedResult<Member[]>(this.baseUrl + 'users', params);
  }

  private getPaginatedResult<T>(url: string, params: HttpParams) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();

    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map((response) => {
        if (response.body === null) return;
        paginatedResult.result = response.body;

        const pagination = response.headers.get('Pagination');

        if (pagination) {
          paginatedResult.pagination = JSON.parse(pagination);
        }
        return paginatedResult;
      })
    );
  }

  getMember(username: string) {
    const member = this.members.find((x) => x.userName === username);
    if (member !== undefined) return of(member);
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = { ...this.members[index], ...member };
      })
    );
  }
  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }
}
