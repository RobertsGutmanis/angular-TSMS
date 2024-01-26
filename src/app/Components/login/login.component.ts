import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../Services/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;
  errorMessage: string = "none";

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  onSubmit(): void {
    if (this.formGroup.status === "VALID") {
      this.authService.login(this.formGroup.value).subscribe({
        next: (value: any): void => {
          localStorage.setItem("auth_token", value.data.token)
          this.router.navigate(["/crud/read"])
        },
        error: (error: HttpErrorResponse): void => {
          this.errorMessage = "authError"
        }
      })

    } else {
      this.errorMessage = "formError"
    }
  }
}
