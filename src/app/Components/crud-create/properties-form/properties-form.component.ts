import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {GetService} from "../../../Services/get.service";
import {Unit} from "../../../Interfaces/unit.interface";
import {UnitGet} from "../../../Interfaces/unit-get.interface";
import {HttpErrorResponse} from "@angular/common/http";
import {Property} from "../../../Interfaces/property.interface";
import {PropertyGet} from "../../../Interfaces/property-get.interface";
import {StoreService} from "../../../Services/store.service";

@Component({
  selector: 'app-properties-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './properties-form.component.html',
  styleUrl: './properties-form.component.scss'
})
export class PropertiesFormComponent implements OnInit {
  formGroup!: FormGroup;
  units!: Unit[];
  properties!: Property[];
  successMessage: string = "none"

  constructor(private getService: GetService, private storeService: StoreService) {
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
  }

  onSubmit(): void {

    if (this.formGroup.status !== "VALID") {
      this.successMessage = "Forma nepareizi aizpildīta!"
      return
    }

    if (this.formGroup.value.parent_id === "") {
      this.formGroup.removeControl('parent_id')
    } else if (this.formGroup.value.unit_id === "") {
      this.formGroup.removeControl('unit_id')
    }
    this.storeService.storeProperty(this.formGroup.value).subscribe({
      next: (response: any): void => {
        if (response.success) {
          this.successMessage = "success";
          this.formGroup.reset();
        }
      },
      error: (error: HttpErrorResponse): void => {
        this.successMessage = error.error.message
      }
    })

  }

  disableParent(): void {
    this.formGroup.controls['parent_id'].disable()
  }

  disableUnit(): void {
    this.formGroup.controls['unit_id'].disable()
  }
}
