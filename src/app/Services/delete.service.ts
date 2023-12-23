import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  constructor(private http: HttpClient) {
  }

  deleteIntersection(id: number): Observable<any> {
    return this.http.delete(`http://127.0.0.1:8000/api/v1/intersections/${id}`)
  }

  deleteUnitType(id: number): Observable<any> {
    return this.http.delete(`http://127.0.0.1:8000/api/v1/unit-types/${id}`)
  }

  deleteUnitPlacemenet(id: number): Observable<any> {
    return this.http.delete(`http://127.0.0.1:8000/api/v1/unit-placements/${id}`)
  }

  deleteProperty(id: number): Observable<any> {
    return this.http.delete(`http://127.0.0.1:8000/api/v1/properties/${id}`)
  }

  deleteObjectType(id: number): Observable<any> {
    return this.http.delete(`http://127.0.0.1:8000/api/v1/object-types/${id}`)
  }
}
