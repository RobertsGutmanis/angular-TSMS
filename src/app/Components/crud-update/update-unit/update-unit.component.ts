import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {IntersectionObjectGet} from "../../../Interfaces/intersection_object-get.interface";
import {IntersectionObject} from "../../../Interfaces/intersection_object.interface";
import {ObjectTypeGetSingle} from "../../../Interfaces/object-type-get-single.interface";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {GetService} from "../../../Services/get.service";
import {UpdateService} from "../../../Services/update.service";
import {DeleteService} from "../../../Services/delete.service";
import {IntersectionOBjectWithType} from "../../../Interfaces/intersection-object-with-type.interface";
import {Intersection} from "../../../Interfaces/intersection.interfrace";
import {UnitType} from "../../../Interfaces/unit_type.interface";
import {UnitPlacemenet} from "../../../Interfaces/unit_placement.interface";
import {IntersectionGet} from "../../../Interfaces/Intersection-get.interface";
import {UnitTypeGet} from "../../../Interfaces/unit_type-get.interface";
import {UnitPlacementGet} from "../../../Interfaces/unit_placemenet-get.interface";
import {UnitGetSingle} from "../../../Interfaces/unit-get-single.interface";
import {IntersectionObjectGetSingle} from "../../../Interfaces/intersection_object-get-single.interface";
import {IntersectionGetSingle} from "../../../Interfaces/intersection-get-single.interface";

@Component({
  selector: 'app-update-unit',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './update-unit.component.html',
  styleUrl: './update-unit.component.scss'
})
export class UpdateUnitComponent implements OnInit{
  successMessage: string = "none"
  formGroup!: FormGroup;
  unitId: number;
  intersectionObjects!: IntersectionOBjectWithType[];
  intersections!: Intersection[];
  unitTypes!: UnitType[];
  unitPlacements!: UnitPlacemenet[];

  constructor(private activeRoute: ActivatedRoute, private router: Router, private getService: GetService, private updateService: UpdateService, private deleteService: DeleteService) {
    this.unitId = this.activeRoute.snapshot.params['id']
    if (this.unitId === 0 || isNaN(this.unitId)) {
      this.router.navigate(['crud/read/units'])
    }
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
        alert(error.error.message)
      }
    })

    this.getService.getUnitTypes().subscribe({
      next: (response: UnitTypeGet): void => {
        this.unitTypes = response.data;
      },
      error: (error: HttpErrorResponse): void => {
        alert(error.error.message)
      }
    })

    this.getService.getUnitPlacemenets().subscribe({
      next: (response: UnitPlacementGet): void => {
        this.unitPlacements = response.data;
      },
      error: (error: HttpErrorResponse): void => {
        alert(error.error.message)
      }
    })

    this.getService.getSingleUnit(this.unitId).subscribe({
      next: (response: UnitGetSingle): void=>{
        const activeUnit: any =  response.data;
        this.getService.getSingleObject(activeUnit.intersection_object_id).subscribe({
          next: (response: IntersectionObjectGetSingle): void=>{
            this.getService.getSingleIntersection(response.data.intersection_id).subscribe({
              next: (response: IntersectionGetSingle): void=>{
                this.formGroup.setValue({
                  intersection_id: response.data.id,
                  intersection_object_id: activeUnit.intersection_object_id,
                  unit_type_id: activeUnit.unit_type_id,
                  unit_placement_id: activeUnit.unit_placement_id,
                  serial_number: activeUnit.serial_number,
                  management_ipv4: activeUnit.management_ipv4 ?? "",
                  management_ipv6: activeUnit.management_ipv6 ?? ""
                })
                this.onSelectIntersection()
              }
            })
          }
        })
      }
    })
  }

  onSubmit(): void{
    if (this.formGroup.status !== "VALID") {
      this.successMessage = "Forma nepareizi aizpildīta!"
      return
    }
    console.log(this.formGroup.value)
    this.updateService.updateUnit(this.unitId, this.formGroup.value).subscribe({
      next: (response: any): void=>{
        this.router.navigate(['crud/read/units'])
      },
      error: (error: HttpErrorResponse): void=>{
        alert(error.error.message)
      }
    })
  }

  onSelectIntersection(): void {
    this.intersectionObjects = []
    this.getService.getIntersectionALlObjects(this.formGroup.value.intersection_id).subscribe({
      next: (response: IntersectionObjectGet): void => {
        this.intersectionObjects = response.data
        this.intersectionObjects.forEach((e: IntersectionObject, index: number): void => {
          this.getService.getSingleObjectType(e.object_type_id).subscribe({
            next: (response: ObjectTypeGetSingle): void => {
              this.intersectionObjects[index].objectType = response.data.type;
            },
            error: (error: HttpErrorResponse): void => {
              alert(error.error.message)
            }
          })
        })
      },
      error: (error: HttpErrorResponse): void => {
        alert(error.error.message)
      }
    })
  }

  onDelete(): void{
    this.deleteService.deleteUnit(this.unitId).subscribe({
      next: (response: any): void=>{
        this.router.navigate(['crud/read/units'])
      },
      error: (error: HttpErrorResponse): void=>{
        alert(error.error.message)
      }
    })
  }
}
