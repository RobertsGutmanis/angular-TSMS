import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {GetService} from "../../../Services/get.service";
import {UpdateService} from "../../../Services/update.service";
import {DeleteService} from "../../../Services/delete.service";
import {UnitPlacementGetSingle} from "../../../Interfaces/unit_placemenet-get-single.interface";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-update-unit-placemenet',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './update-unit-placemenet.component.html',
  styleUrl: './update-unit-placemenet.component.scss'
})
export class UpdateUnitPlacemenetComponent implements OnInit {
  successMessage: string = "none"
  formGroup!: FormGroup;
  placemenetId: number;

  constructor(private activeRoute: ActivatedRoute, private router: Router, private getService: GetService, private updateService: UpdateService, private deleteService: DeleteService) {
    this.placemenetId = this.activeRoute.snapshot.params['id']
    if (this.placemenetId === 0 || isNaN(this.placemenetId)) {
      this.router.navigate(['crud/read/unit-placements'])
    }
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      "class": new FormControl('', [Validators.required]),
      "direction": new FormControl('', [Validators.required, Validators.maxLength(12)]),
      "type": new FormControl('', [Validators.required, Validators.maxLength(5)]),
    })
    this.getService.getSingleUnitPlacemenet(this.placemenetId).subscribe({
      next: (response: UnitPlacementGetSingle): void => {
        this.formGroup.setValue({
          class: response.data.class,
          direction: response.data.direction,
          type: response.data.type
        })
      },
      error: (error: HttpErrorResponse): void => {
        alert(error.error.message)
        this.router.navigate(['crud/read/unit-placements'])
      }
    })
  }

  onSubmit(): void {
    if (this.formGroup.status !== "VALID") {
      this.successMessage = "Forma nepareizi aizpildīta!"
      return
    }
    this.updateService.updateUnitPlacemenet(this.placemenetId, this.formGroup.value).subscribe({
      next: (response: any): void => {
        this.router.navigate(["crud/read/unit-placements"])
      },
      error: (error: HttpErrorResponse): void => {
        this.successMessage = error.error.message
      }
    })
  }

  onDelete(): void {
    this.deleteService.deleteUnitPlacemenet(this.placemenetId).subscribe({
      next: (response: any): void => {
        this.router.navigate(["crud/read/unit-placements"])
      },
      error: (error: HttpErrorResponse): void => {
        this.successMessage = error.error.message
      }
    })
  }
}
