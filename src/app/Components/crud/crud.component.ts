import {Component, OnInit} from '@angular/core';
import {CrudReadComponent} from "../crud-read/crud-read.component";
import {CrudCreateComponent} from "../crud-create/crud-create.component";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {NgClass} from "@angular/common";
import {AuthService} from "../../Services/auth.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [
    CrudReadComponent,
    CrudCreateComponent,
    RouterOutlet,
    NgClass,
    RouterLink
  ],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.scss'
})
export class CrudComponent implements OnInit {
  tabs: string[] = ["create", "read"]
  activeTab: string = "none"

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    if (window.location.pathname.includes("/crud/create")) {
      if (localStorage.getItem("auth_token")) {
        this.activeTab = "create"
      } else {
        alert("Nav autorizēts!")
        this.router.navigate(["crud", "read"])
        this.activeTab = "read";
      }
    } else if (window.location.pathname.includes("/crud/read")) {
      this.activeTab = "read"
    }
  }

  changeTab(tab: string): void {
    if (tab === "create") {
      this.authService.testToken().subscribe({
        next: (value: any): void => {
          if (value.success === true) {
            this.router.navigate(["crud", tab])
            this.activeTab = tab;
          }
        },
        error: (error: HttpErrorResponse): void => {
          if (error.status === 401) {
            alert("Nav autorizēts!")
          }
        }
      })
    } else if (tab !== "create") {
      this.router.navigate(["crud", tab])
      this.activeTab = tab;
    } else {
      alert("Nav autorizēts!")
    }
  }

  logout(): void{
    this.localStorage.clear()
    this.router.navigate(["/"])
  }

  protected readonly localStorage = localStorage;
}
