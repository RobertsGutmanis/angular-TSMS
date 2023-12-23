import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Intersection} from "../Interfaces/intersection.interfrace";
import {Observable} from "rxjs";
import {UnitType} from "../Interfaces/unit_type.interface";
import {UnitPlacemenet} from "../Interfaces/unit_placement.interface";
import {Property} from "../Interfaces/property.interface";
import {ObjectType} from "../Interfaces/object_type.interface";

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private http: HttpClient) {
  }

  updateIntersection(id: number, intersection: Intersection): Observable<any> {
    return this.http.patch(`http://127.0.0.1:8000/api/v1/intersections/${id}`, intersection)
  }

  updateUnitType(id: number, type: UnitType): Observable<any> {
    return this.http.patch(`http://127.0.0.1:8000/api/v1/unit-types/${id}`, type)
  }

  updateUnitPlacemenet(id: number, placement: UnitPlacemenet): Observable<any> {
    return this.http.patch(`http://127.0.0.1:8000/api/v1/unit-placements/${id}`, placement)
  }

  updateProperty(id: number, property: Property): Observable<any> {
    return this.http.patch(`http://127.0.0.1:8000/api/v1/properties/${id}`, property)
  }

  updateObjectType(id: number, type: ObjectType): Observable<any> {
    return this.http.patch(`http://127.0.0.1:8000/api/v1/object-types/${id}`, type)
  }
}
