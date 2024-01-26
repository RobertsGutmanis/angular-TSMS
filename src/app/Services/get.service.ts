import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GetService {

  constructor(private http: HttpClient) {
  }

  getIntersections(): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/v1/intersections`)
  }

  getObjectTypes(): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/v1/object-types`)
  }

  getIntersectionObjects(): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/v1/objects`)
  }

  getIntersectionALlObjects(id: number): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/v1/objects/from-intersection/${id}`)
  }

  getSingleObjectType(id: number): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/v1/object-types/${id}`)
  }

  getUnitTypes(): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/v1/unit-types`)
  }

  getUnitPlacemenets(): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/v1/unit-placements`)
  }

  getUnits(): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/v1/units`);
  }

  getProperties(): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/v1/properties`)
  }

  getSingleIntersection(id: number): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/v1/intersections/${id}`)
  }

  getSingleProperty(id: number): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/v1/properties/${id}`)
  }

  getSingleUnit(id: number): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/v1/units/${id}`)
  }

  getSingleUnitType(id: number): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/v1/unit-types/${id}`)
  }

  getSingleUnitPlacemenet(id: number): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/v1/unit-placements/${id}`)
  }

  getSingleObject(id: number): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/v1/objects/${id}`)
  }

  getObjectsExpanded(): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/v1/objects/expanded`)
  }
}
