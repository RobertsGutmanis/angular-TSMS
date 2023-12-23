import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Property} from "../../../Interfaces/property.interface";
import {Unit} from "../../../Interfaces/unit.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {GetService} from "../../../Services/get.service";
import {UpdateService} from "../../../Services/update.service";
import {DeleteService} from "../../../Services/delete.service";
import {UnitGet} from "../../../Interfaces/unit-get.interface";
import {HttpErrorResponse} from "@angular/common/http";
import {PropertyGet} from "../../../Interfaces/property-get.interface";
import {PropertyGetSingle} from "../../../Interfaces/property-get-single.interface";

@Component({
  selector: 'app-update-property',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './update-property.component.html',
  styleUrl: './update-property.component.scss'
})
export class UpdatePropertyComponent implements OnInit {
  formGroup!: FormGroup;
  successMessage: string = "none";
  propertyId: number = 0;
  units!: Unit[];
  properties!: Property[];

  constructor(private activeRoute: ActivatedRoute, private router: Router, private getService: GetService, private updateService: UpdateService, private deleteService: DeleteService) {
    this.propertyId = this.activeRoute.snapshot.params['id']
    if (this.propertyId === 0 || isNaN(this.propertyId)) {
      this.router.navigate(['crud/read/properties'])
    }
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      "unit_id": new FormControl(''),
      "parent_id": new FormControl(''),
      "key": new FormControl('', [Validators.required, Validators.maxLength(20)]),
      "value": new FormControl('', [Validators.required, Validators.maxLength(50)]),
    })

    this.getService.getUnits().subscribe({
      next: (response: UnitGet): void => {
        this.units = response.data;
      },
      error: (error: HttpErrorResponse): void => {
        alert("Radās kļūda iegūstot datus no servera!")
      }
    })

    this.getService.getProperties().subscribe({
      next: (response: PropertyGet): void => {
        this.properties = response.data;
      },
      error: (error: HttpErrorResponse): void => {
        alert("Radās kļūda iegūstot datus no servera!")
      }
    })

    this.getService.getSingleProperty(this.propertyId).subscribe({
      next: (response: PropertyGetSingle): void => {
        this.formGroup.setValue({
          unit_id: response.data.unit_id,
          parent_id: response.data.parent_id,
          key: response.data.key,
          value: response.data.value
        })
      },
      error: (error: HttpErrorResponse): void => {
        this.router.navigate(['crud/read/properties'])
      }
    })
  }

  onSubmit(): void {
    if (this.formGroup.status !== "VALID") {
      this.successMessage = "Forma nepareizi aizpildīta!"
      return
    }
    if (this.formGroup.value.parent_id == null) {
      this.formGroup.removeControl('parent_id')
    } else if (this.formGroup.value.unit_id == null) {
      this.formGroup.removeControl('unit_id')
    }
    this.updateService.updateProperty(this.propertyId, this.formGroup.value).subscribe({
      next: (response: any): void => {
        this.router.navigate(["crud/read/properties"])
      },
      error: (error: HttpErrorResponse): void => {
        this.successMessage = error.error.message
      }
    })
  }

  onDelete(): void {
    this.deleteService.deleteProperty(this.propertyId).subscribe({
      next: (response: any): void => {
        this.router.navigate(["crud/read/properties"])
      },
      error: (error: HttpErrorResponse): void => {
        this.successMessage = error.error.message
      }
    })
  }

  disableParent(): void {
    this.formGroup.controls['parent_id'].setValue(null)
    this.formGroup.controls['parent_id'].disable()
  }

  disableUnit(): void {
    this.formGroup.controls['unit_id'].setValue(null)
    this.formGroup.controls['unit_id'].disable()
  }

}
