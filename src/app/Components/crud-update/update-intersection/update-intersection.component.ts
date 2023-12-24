import {Component, OnInit} from '@angular/core';
import {Intersection} from "../../../Interfaces/intersection.interfrace";
import {ActivatedRoute, Router} from "@angular/router";
import {GetService} from "../../../Services/get.service";
import {IntersectionGetSingle} from "../../../Interfaces/intersection-get-single.interface";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UpdateService} from "../../../Services/update.service";
import {HttpErrorResponse} from "@angular/common/http";
import {DeleteService} from "../../../Services/delete.service";

@Component({
  selector: 'app-update-intersection',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './update-intersection.component.html',
  styleUrl: './update-intersection.component.scss'
})
export class UpdateIntersectionComponent implements OnInit {
  currentIntersection!: Intersection;
  intersectionId: number;
  formGroup!: FormGroup;
  successMessage: string = "none";

  constructor(private activeRoute: ActivatedRoute, private router: Router, private getService: GetService, private updateService: UpdateService, private deleteService: DeleteService) {
    this.intersectionId = this.activeRoute.snapshot.params['id']
    if (this.intersectionId === 0 || isNaN(this.intersectionId)) {
      this.router.navigate(['crud/read/intersection'])
    }
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      "title": new FormControl('', [Validators.required, Validators.maxLength(50)]),
      "longitude": new FormControl('', [Validators.required, Validators.min(-180), Validators.max(180)]),
      "latitude": new FormControl('', [Validators.required, Validators.min(-90), Validators.max(90)]),
      "radius": new FormControl('', [Validators.required])
    })

    this.getService.getSingleIntersection(this.intersectionId).subscribe({
      next: (intersection: IntersectionGetSingle): void => {
        this.currentIntersection = intersection.data
        this.formGroup.setValue({
          title: this.currentIntersection.title,
          longitude: this.currentIntersection.longitude,
          latitude: this.currentIntersection.latitude,
          radius: this.currentIntersection.radius
        })
      },
      error: (error: HttpErrorResponse): void => {
        alert("Servera kļūda!")
        this.router.navigate(['crud/read/intersection'])
      }
    })
  }

  onSubmit(): void {
    if (this.formGroup.status !== "VALID") {
      this.successMessage = "Forma nepareizi aizpildīta!"
      return
    }
    this.updateService.updateIntersection(this.intersectionId, this.formGroup.value).subscribe({
      next: (response: any): void => {
        this.router.navigate(["crud/read/intersection"])
      },
      error: (error: HttpErrorResponse): void => {
        this.successMessage = error.error.message
      }
    })
  }

  deleteIntersection(): void {
    this.deleteService.deleteIntersection(this.intersectionId).subscribe({
      next: (response: any): void => {
        this.router.navigate(["crud/read/intersection"])
      },
      error: (error: HttpErrorResponse): void => {
        this.successMessage = error.error.message
      }
    })
  }
}
