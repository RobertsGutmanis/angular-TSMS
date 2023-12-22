import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {StoreService} from "../../../Services/store.service";
import {GetService} from "../../../Services/get.service";
import {IntersectionGet} from "../../../Interfaces/Intersection-get.interface";
import {Intersection} from "../../../Interfaces/intersection.interfrace";
import {HttpErrorResponse} from "@angular/common/http";
import {ObjectType} from "../../../Interfaces/object_type.interface";
import {ObjectTypeGet} from "../../../Interfaces/object_type-get.interface";

@Component({
  selector: 'app-intersection-object-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './intersection-object-form.component.html',
  styleUrl: './intersection-object-form.component.scss'
})
export class IntersectionObjectFormComponent implements OnInit {
  formGroup!: FormGroup;
  intersections!: Intersection[];
  objectTypes!: ObjectType[];
  successMessage: string = "none"
  numRegex: string = "^\\d*(\\.\\d{0,2})?$";

  constructor(private storeService: StoreService, private getService: GetService) {
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      "intersection_id": new FormControl('', [Validators.required, Validators.min(0)]),
      "longitude": new FormControl('', [Validators.required, Validators.min(-180), Validators.max(180)]),
      "latitude": new FormControl('', [Validators.required, Validators.min(-90), Validators.max(90)]),
      "object_type_id": new FormControl('', [Validators.required, Validators.min(0)])
    })

    this.getService.getIntersections().subscribe({
      next: (response: IntersectionGet): void => {
        this.intersections = response.data;
      },
      error: (error: HttpErrorResponse): void => {
        alert("Radās kļūda iegūstot datus no servera!")
      }
    })
    this.getService.getObjectTypes().subscribe({
      next: (response: ObjectTypeGet): void => {
        this.objectTypes = response.data
      },
      error: (error: HttpErrorResponse): void => {
        alert("Radās kļūda iegūstot datus no servera!")
      }
    })
  }

  onSubmit(): void {
    if (this.formGroup.status === "VALID") {
      this.storeService.storeIntersectionObject(this.formGroup.value)
        .subscribe({
          next: (response: any): void => {
            this.successMessage = "success";
            this.formGroup.reset()
          },
          error: (error: HttpErrorResponse) => {
            this.successMessage = "error";
          }
        })
    } else {
      this.successMessage = "error";
    }
  }
}
