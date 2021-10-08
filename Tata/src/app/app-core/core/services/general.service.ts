import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CreateUser } from 'src/app/list-user/entities/user.object';
@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  baseUrl: string;
  constructor(private readonly http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  getListUser(page: number) {
    return this.http.get(`${this.baseUrl}users?page=${page}`);
  }
  insertUser(objectValue: CreateUser) {
    return this.http.post(`${this.baseUrl}users`, objectValue);
  }
  deleteUser(id: number) {
    return this.http.put(`${this.baseUrl}users/${id}`, '');
  }
}
