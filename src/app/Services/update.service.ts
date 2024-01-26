import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Intersection} from "../Interfaces/intersection.interfrace";
import {Observable} from "rxjs";
import {UnitType} from "../Interfaces/unit_type.interface";
import {UnitPlacemenet} from "../Interfaces/unit_placement.interface";
import {Property} from "../Interfaces/property.interface";
import {ObjectType} from "../Interfaces/object_type.interface";
import {Unit} from "../Interfaces/unit.interface";
import {IntersectionObject} from "../Interfaces/intersection_object.interface";

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private http: HttpClient) {
  }

  updateIntersection(id: number, intersection: Intersection): Observable<any> {
    return this.http.patch(`http://127.0.0.1:8000/api/v1/intersections/${id}`, intersection, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem("auth_token") ?? ""}`
      }),
    })
  }

  updateUnitType(id: number, type: UnitType): Observable<any> {
    return this.http.patch(`http://127.0.0.1:8000/api/v1/unit-types/${id}`, type, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem("auth_token") ?? ""}`
      }),
    })
  }

  updateUnitPlacemenet(id: number, placement: UnitPlacemenet): Observable<any> {
    return this.http.patch(`http://127.0.0.1:8000/api/v1/unit-placements/${id}`, placement, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem("auth_token") ?? ""}`
      }),
    })
  }

  updateProperty(id: number, property: Property): Observable<any> {
    return this.http.patch(`http://127.0.0.1:8000/api/v1/properties/${id}`, property, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem("auth_token") ?? ""}`
      }),
    })
  }

  updateObjectType(id: number, type: ObjectType): Observable<any> {
    return this.http.patch(`http://127.0.0.1:8000/api/v1/object-types/${id}`, type, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem("auth_token") ?? ""}`
      }),
    })
  }

  updateUnit(id: number, unit: Unit): Observable<any> {
    return this.http.patch(`http://127.0.0.1:8000/api/v1/units/${id}`, unit, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem("auth_token") ?? ""}`
      }),
    })
  }

  updateObject(id: number, object: IntersectionObject): Observable<any> {
    return this.http.patch(`http://127.0.0.1:8000/api/v1/objects/${id}`, object, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem("auth_token") ?? ""}`
      }),
    })
  }
}
