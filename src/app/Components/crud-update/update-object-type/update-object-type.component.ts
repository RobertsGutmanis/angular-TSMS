import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {GetService} from "../../../Services/get.service";
import {UpdateService} from "../../../Services/update.service";
import {DeleteService} from "../../../Services/delete.service";
import {ObjectTypeGetSingle} from "../../../Interfaces/object-type-get-single.interface";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-update-object-type',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './update-object-type.component.html',
  styleUrl: './update-object-type.component.scss'
})
export class UpdateObjectTypeComponent implements OnInit {
  formGroup!: FormGroup;
  successMessage: string = "none";
  typeId: number;

  constructor(private activeRoute: ActivatedRoute, private router: Router, private getService: GetService, private updateService: UpdateService, private deleteService: DeleteService) {
    this.typeId = this.activeRoute.snapshot.params['id']
    if (this.typeId === 0 || isNaN(this.typeId)) {
      this.router.navigate(['crud/read/object-type'])
    }
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      "type": new FormControl('', [Validators.required, Validators.max(25)])
    })
    this.getService.getSingleObjectType(this.typeId).subscribe({
      next: (response: ObjectTypeGetSingle): void => {
        this.formGroup.setValue({
          type: response.data.type
        })
      },
      error: (error: HttpErrorResponse): void => {
        this.router.navigate(['crud/read/object-type'])
      }
    })
  }

  onSubmit(): void {
    if (this.formGroup.status !== "VALID") {
      this.successMessage = "Forma nepareizi aizpildīta!"
      return
    }
    this.updateService.updateObjectType(this.typeId, this.formGroup.value).subscribe({
      next: (response: any): void => {
        this.router.navigate(['crud/read/object-type'])
      },
      error: (error: HttpErrorResponse): void => {
        this.successMessage = error.error.message
      }
    })

  }

  onDelete(): void {
    this.deleteService.deleteObjectType(this.typeId).subscribe({
      next: (response: any): void => {
        this.router.navigate(['crud/read/object-type'])
      },
      error: (error: HttpErrorResponse): void => {
        this.successMessage = error.error.message
      }
    })
  }
}
