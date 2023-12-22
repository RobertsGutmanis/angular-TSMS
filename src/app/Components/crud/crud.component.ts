import {Component, OnInit} from '@angular/core';
import {CrudReadComponent} from "../crud-read/crud-read.component";
import {CrudCreateComponent} from "../crud-create/crud-create.component";
import {Router, RouterOutlet} from "@angular/router";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [
    CrudReadComponent,
    CrudCreateComponent,
    RouterOutlet,
    NgClass
  ],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.scss'
})
export class CrudComponent implements OnInit {
  tabs: string[] = ["create", "read"]
  activeTab: string = "none"

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    if (window.location.pathname.includes("/crud/create")) {
      this.activeTab = "create"
    } else if (window.location.pathname.includes("/crud/read")) {
      this.activeTab = "read"
    }
  }

  changeTab(tab: string): void {
    this.activeTab = tab;
    this.router.navigate(["crud", tab])
  }
}
