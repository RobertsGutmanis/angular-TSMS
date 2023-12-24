import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Intersection} from "../../../Interfaces/intersection.interfrace";
import {ObjectType} from "../../../Interfaces/object_type.interface";
import {IntersectionGet} from "../../../Interfaces/Intersection-get.interface";
import {HttpErrorResponse} from "@angular/common/http";
import {ObjectTypeGet} from "../../../Interfaces/object_type-get.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {GetService} from "../../../Services/get.service";
import {UpdateService} from "../../../Services/update.service";
import {DeleteService} from "../../../Services/delete.service";
import {IntersectionObjectGetSingle} from "../../../Interfaces/intersection_object-get-single.interface";

@Component({
  selector: 'app-update-object',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './update-object.component.html',
  styleUrl: './update-object.component.scss'
})
export class UpdateObjectComponent implements OnInit{
  formGroup!: FormGroup;
  intersections!: Intersection[];
  objectTypes!: ObjectType[];
  successMessage: string = "none"
  objectId: number;

  constructor(private activeRoute: ActivatedRoute, private router: Router, private getService: GetService, private updateService: UpdateService, private deleteService: DeleteService) {
    this.objectId = this.activeRoute.snapshot.params['id']
    if (this.objectId === 0 || isNaN(this.objectId)) {
      this.router.navigate(['crud/read/intersection-object'])
    }
  }

  ngOnInit() : void{
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
        alert(error.error.message)
      }
    })
    this.getService.getObjectTypes().subscribe({
      next: (response: ObjectTypeGet): void => {
        this.objectTypes = response.data
      },
      error: (error: HttpErrorResponse): void => {
        alert(error.error.message)
      }
    })

    this.getService.getSingleObject(this.objectId).subscribe({
      next: (response: IntersectionObjectGetSingle): void=>{
        this.formGroup.setValue({
          intersection_id: response.data.intersection_id,
          longitude: response.data.longitude,
          latitude: response.data.latitude,
          object_type_id: response.data.object_type_id
        })
      },
      error: (error: HttpErrorResponse): void => {
        alert(error.error.message)
      }
    })
  }

  onSubmit(): void{
    if (this.formGroup.status !== "VALID") {
      this.successMessage = "Forma nepareizi aizpildīta!"
      return
    }
    this.updateService.updateObject(this.objectId, this.formGroup.value).subscribe({
      next: (response: any): void=>{
        this.router.navigate(['crud/read/intersection-object'])
      },
      error: (error: HttpErrorResponse): void=>{
        alert(error.error.message)
      }
    })
  }

  onDelete(): void{
    this.deleteService.deleteObject(this.objectId).subscribe({
      next: (response: any): void=>{
        this.router.navigate(['crud/read/intersection-object'])
      },
      error: (error: HttpErrorResponse): void=>{
        this.successMessage = error.error.message
      }
    })
  }

}
