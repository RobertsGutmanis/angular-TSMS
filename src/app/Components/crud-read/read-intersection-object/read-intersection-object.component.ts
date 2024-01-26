import {Component, OnInit} from '@angular/core';
import {GetService} from "../../../Services/get.service";
import {IntersectionObject} from "../../../Interfaces/intersection_object.interface";
import {IntersectionObjectGet} from "../../../Interfaces/intersection_object-get.interface";
import {HttpErrorResponse} from "@angular/common/http";
import {DisplayIntersectionObject} from "../../../Interfaces/display-intersectionObject.interface";
import {IntersectionGetSingle} from "../../../Interfaces/intersection-get-single.interface";
import {ObjectTypeGetSingle} from "../../../Interfaces/object-type-get-single.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-read-intersection-object',
  standalone: true,
  imports: [],
  templateUrl: './read-intersection-object.component.html',
  styleUrl: './read-intersection-object.component.scss'
})
export class ReadIntersectionObjectComponent implements OnInit {
  objects!: IntersectionObject[]
  objectsToDisplay: DisplayIntersectionObject[] = [];

  constructor(private getService: GetService, private router: Router) {
  }

  ngOnInit(): void {
    this.getService.getIntersectionObjects().subscribe({
      next: (response: IntersectionObjectGet): void => {
        this.objects = response.data;
        this.objects.forEach((object: IntersectionObject, index: number): void => {
          let currentObject: DisplayIntersectionObject = {
            id: 0,
            intersection: "",
            object_type: "",
            latitude: 0,
            longitude: 0,
          };
          this.getService.getSingleIntersection(object.intersection_id).subscribe({
            next: (response: IntersectionGetSingle): void => {
              currentObject.intersection = response.data.title;
            },
            error: (error: HttpErrorResponse): void => {
              alert("Radās kļūda iegūstot datus no servera!")
            }
          })

          this.getService.getSingleObjectType(object.object_type_id).subscribe({
            next: (response: ObjectTypeGetSingle): void => {
              currentObject.object_type = response.data.type
            },
            error: (error: HttpErrorResponse): void => {
              alert("Radās kļūda iegūstot datus no servera!")
            }
          })
          currentObject.latitude = object.latitude
          currentObject.longitude = object.longitude
          currentObject.id = object.id

          this.objectsToDisplay.push(currentObject)
        })
      },
      error: (error: HttpErrorResponse): void => {
        alert("Radās kļūda iegūstot datus no servera!")
      }
    })
  }

  onEdit(id: number): void {
    this.router.navigate(["crud", "update", "intersection-object", id])
  }
}
