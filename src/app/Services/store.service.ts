import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UnitType} from "../Interfaces/unit_type.interface";
import {ObjectType} from "../Interfaces/object_type.interface";
import {UnitPlacemenet} from "../Interfaces/unit_placemenet.interface";
import {Intersection} from "../Interfaces/intersection.interfrace";
import {IntersectionObject} from "../Interfaces/intersection_object.interface";
import {Unit} from "../Interfaces/unit.interface";
import {Property} from "../Interfaces/property.interface";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) {
  }

  storeObjectType(object_type: ObjectType): Observable<any> {
    return this.http.post(`http://127.0.0.1:8000/api/v1/object-types`, object_type)
  }

  storeUnitType(unit_type: UnitType): Observable<any> {
    return this.http.post(`http://127.0.0.1:8000/api/v1/unit-types`, unit_type)
  }

  storeUnitPlacement(unit_placemenet: UnitPlacemenet): Observable<any> {
    return this.http.post(`http://127.0.0.1:8000/api/v1/unit-placements`, unit_placemenet)
  }

  storeIntersection(intersection: Intersection): Observable<any> {
    return this.http.post(`http://127.0.0.1:8000/api/v1/intersections`, intersection)
  }

  storeIntersectionObject(intersectionObject: IntersectionObject): Observable<any> {
    return this.http.post(`http://127.0.0.1:8000/api/v1/objects`, intersectionObject);
  }

  storeUnits(unit: Unit): Observable<any> {
    return this.http.post(`http://127.0.0.1:8000/api/v1/units`, unit)
  }

  storeProperty(property: Property): Observable<any> {
    return this.http.post(`http://127.0.0.1:8000/api/v1/properties`, property)
  }
}
