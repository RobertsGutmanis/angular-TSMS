import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {GetService} from "../../../Services/get.service";
import {StoreService} from "../../../Services/store.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Intersection} from "../../../Interfaces/intersection.interfrace";
import {IntersectionGet} from "../../../Interfaces/Intersection-get.interface";
import {IntersectionObject} from "../../../Interfaces/intersection_object.interface";
import {IntersectionObjectGet} from "../../../Interfaces/intersection_object-get.interface";
import {IntersectionOBjectWithType} from "../../../Interfaces/intersection-object-with-type.interface";
import {ObjectTypeGetSingle} from "../../../Interfaces/object-type-get-single.interface";
import {UnitType} from "../../../Interfaces/unit_type.interface";
import {UnitTypeGet} from "../../../Interfaces/unit_type-get.interface";
import {UnitPlacemenet} from "../../../Interfaces/unit_placement.interface";
import {UnitPlacementGet} from "../../../Interfaces/unit_placemenet-get.interface";

@Component({
  selector: 'app-units-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './units-form.component.html',
  styleUrl: './units-form.component.scss'
})
export class UnitsFormComponent implements OnInit {
  formGroup!: FormGroup;
  intersections!: Intersection[];
  intersectionObjects!: IntersectionOBjectWithType[];
  unitTypes!: UnitType[];
  successMessage: string = "none"
  unitPLacements!: UnitPlacemenet[];

  constructor(private getService: GetService, private storeService: StoreService) {
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      "intersection_id": new FormControl('', [Validators.required]),
      "intersection_object_id": new FormControl('', Validators.required),
      "unit_type_id": new FormControl('', [Validators.required]),
      "unit_placement_id": new FormControl('', [Validators.required]),
      "serial_number": new FormControl('', [Validators.required, Validators.maxLength(20)]),
      "management_ipv4": new FormControl('', [Validators.maxLength(15)]),
      "management_ipv6": new FormControl('', [Validators.maxLength(39)]),
    })

    this.getService.getIntersections().subscribe({
      next: (response: IntersectionGet): void => {
        this.intersections = response.data
      },
      error: (error: HttpErrorResponse): void => {
        alert("Radās kļūda iegūstot datus no servera!")
      }
    })

    this.getService.getUnitTypes().subscribe({
      next: (response: UnitTypeGet): void => {
        this.unitTypes = response.data;
      },
      error: (error: HttpErrorResponse): void => {
        alert("Radās kļūda iegūstot datus no servera!")
      }
    })

    this.getService.getUnitPlacemenets().subscribe({
      next: (response: UnitPlacementGet): void => {
        this.unitPLacements = response.data;
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

    if (this.formGroup.value.management_ipv4 === "") {
      this.formGroup.value.management_ipv4 = "null"
    }
    if (this.formGroup.value.management_ipv6 === "") {
      this.formGroup.value.management_ipv6 = "null"
    }
    delete this.formGroup.value.intersection_id;
    this.storeService.storeUnits(this.formGroup.value).subscribe({
      next: (respons: any): void => {
        this.successMessage = "success"
        this.formGroup.reset()
      },
      error: (error: HttpErrorResponse): void => {
        this.successMessage = error.error.message
      }
    })
  }

  onSelectIntersection(): void {
    this.getService.getIntersectionALlObjects(this.formGroup.value.intersection_id).subscribe({
      next: (response: IntersectionObjectGet): void => {
        this.intersectionObjects = response.data
        this.intersectionObjects.forEach((e: IntersectionObject, index: number): void => {
          this.getService.getSingleObjectType(e.intersection_id).subscribe({
            next: (response: ObjectTypeGetSingle): void => {
              this.intersectionObjects[index].objectType = response.data.type;
            },
            error: (error: HttpErrorResponse): void => {
              alert("Radās kļūda iegūstot datus no servera!")
            }
          })
        })
      },
      error: (error: HttpErrorResponse): void => {
        alert("Radās kļūda iegūstot datus no servera!")
      }
    })
  }
}
