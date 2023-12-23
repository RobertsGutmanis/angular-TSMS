import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {StoreService} from "../../../Services/store.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-object-type-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './object-type-form.component.html',
  styleUrl: './object-type-form.component.scss'
})
export class ObjectTypeFormComponent implements OnInit {
  formGroup!: FormGroup;
  successMessage: string = "none";

  constructor(private storeService: StoreService) {
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      "type": new FormControl('', [Validators.required, Validators.max(25)])
    })
  }

  onSubmit(): void {
    if (this.formGroup.status !== "VALID") {
      this.successMessage = "Forma nepareizi aizpildīta!"
      return
    }

    this.storeService.storeObjectType(this.formGroup.value)
      .subscribe({
        next: (response: any): void => {
          if (response.success) {
            this.successMessage = "success";
            this.formGroup.reset();
          }
        },
        error: (error: HttpErrorResponse): void => {
          this.successMessage = error.error.message;
        }
      })

  }
}
