import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Login} from "../Interfaces/login.interface";

const headers: {headers: HttpHeaders} = {
  headers: new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem("auth_token") ?? ""}`
  }),
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  testToken(): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/v1/testToken`, headers)
  }

  login(creds: Login): Observable<any> {
    return this.http.post(`http://127.0.0.1:8000/api/v1/login`, creds);
  }
}
