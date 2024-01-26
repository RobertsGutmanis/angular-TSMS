import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  constructor(private http: HttpClient) {
  }

  deleteIntersection(id: number): Observable<any> {
    return this.http.delete(`http://127.0.0.1:8000/api/v1/intersections/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem("auth_token") ?? ""}`
      }),
    })
  }

  deleteUnitType(id: number): Observable<any> {
    return this.http.delete(`http://127.0.0.1:8000/api/v1/unit-types/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem("auth_token") ?? ""}`
      }),
    })
  }

  deleteUnitPlacemenet(id: number): Observable<any> {
    return this.http.delete(`http://127.0.0.1:8000/api/v1/unit-placements/${id}`,{
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem("auth_token") ?? ""}`
      }),
    })
  }

  deleteProperty(id: number): Observable<any> {
    return this.http.delete(`http://127.0.0.1:8000/api/v1/properties/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem("auth_token") ?? ""}`
      }),
    })
  }

  deleteObjectType(id: number): Observable<any> {
    return this.http.delete(`http://127.0.0.1:8000/api/v1/object-types/${id}`,{
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem("auth_token") ?? ""}`
      }),
    })
  }

  deleteUnit(id: number): Observable<any> {
    return this.http.delete(`http://127.0.0.1:8000/api/v1/units/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem("auth_token") ?? ""}`
      }),
    })
  }

  deleteObject(id: number): Observable<any> {
    return this.http.delete(`http://127.0.0.1:8000/api/v1/objects/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem("auth_token") ?? ""}`
      }),
    })
  }
}
