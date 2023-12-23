import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {GetService} from "../../../Services/get.service";
import {UpdateService} from "../../../Services/update.service";
import {DeleteService} from "../../../Services/delete.service";
import {UnitTypeGetSingle} from "../../../Interfaces/unit_type-get-single.interface";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-update-unit-type',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './update-unit-type.component.html',
  styleUrl: './update-unit-type.component.scss'
})
export class UpdateUnitTypeComponent implements OnInit {
  successMessage: string = "none"
  typeId: number;
  formGroup!: FormGroup;

  constructor(private activeRoute: ActivatedRoute, private router: Router, private getService: GetService, private updateService: UpdateService, private deleteService: DeleteService) {
    this.typeId = this.activeRoute.snapshot.params['id']
    if (this.typeId === 0 || isNaN(this.typeId)) {
      this.router.navigate(['crud/read/unit-type'])
    }
    this.getService.getSingleUnitType(this.typeId).subscribe({
      next: (response: UnitTypeGetSingle): void => {
        this.formGroup.setValue({
          type: response.data.type
        })
      },
      error: (error: HttpErrorResponse): void => {
        alert("Servera kļūda!")
        this.router.navigate(['crud/read/unit-type'])
      }
    })
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      "type": new FormControl('', [Validators.required, Validators.max(50)])
    })
  }

  onSubmit(): void {
    if (this.formGroup.status !== "VALID") {
      this.successMessage = "Forma nepareizi aizpildīta!"
      return
    }
    this.updateService.updateUnitType(this.typeId, this.formGroup.value).subscribe({
      next: (response: any): void => {
        this.router.navigate(["crud/read/unit-type"])
      },
      error: (error: HttpErrorResponse): void => {
        this.successMessage = error.error.message
      }
    })
  }

  onDelete(): void {
    this.deleteService.deleteUnitType(this.typeId).subscribe({
      next: (response: any): void => {
        this.router.navigate(["crud/read/unit-type"])
      },
      error: (error: HttpErrorResponse): void => {
        alert("Servera kļūda!")
      }
    })
  }
}
