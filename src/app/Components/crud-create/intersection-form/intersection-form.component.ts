import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {StoreService} from "../../../Services/store.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-intersection-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './intersection-form.component.html',
  styleUrl: './intersection-form.component.scss'
})
export class IntersectionFormComponent implements OnInit {
  formGroup!: FormGroup;
  successMessage: string = "none"

  constructor(private storeService: StoreService) {
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      "title": new FormControl('', [Validators.required, Validators.maxLength(50)]),
      "longitude": new FormControl('', [Validators.required, Validators.min(-180), Validators.max(180)]),
      "latitude": new FormControl('', [Validators.required, Validators.min(-90), Validators.max(90)]),
      "radius": new FormControl('', [Validators.required])
    })
  }

  onSubmit(): void {
    if (this.formGroup.status !== "VALID") {
      this.successMessage = "Forma nepareizi aizpildīta!"
      return
    }
    this.storeService.storeIntersection(this.formGroup.value)
      .subscribe({
        next: (response: any): void => {
          this.formGroup.reset()
          this.successMessage = "success"
        },
        error: (error: HttpErrorResponse): void => {
          this.successMessage = error.error.message
        }
      })
  }
}
