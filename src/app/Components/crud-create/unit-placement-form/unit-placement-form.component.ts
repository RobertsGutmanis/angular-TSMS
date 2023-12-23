import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {StoreService} from "../../../Services/store.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-unit-placement-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './unit-placement-form.component.html',
  styleUrl: './unit-placement-form.component.scss'
})
export class UnitPlacementFormComponent implements OnInit {
  formGroup!: FormGroup;
  successMessage: string = "none";

  constructor(private storeService: StoreService) {
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      "class": new FormControl('', [Validators.required]),
      "direction": new FormControl('', [Validators.required, Validators.maxLength(12)]),
      "type": new FormControl('', [Validators.required, Validators.maxLength(5)]),
    })
  }

  onSubmit(): void {

    if (this.formGroup.status !== "VALID") {
      this.successMessage = "Forma nepareizi aizpildīta!"
      return
    }

    this.storeService.storeUnitPlacement(this.formGroup.value)
      .subscribe({
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
}
