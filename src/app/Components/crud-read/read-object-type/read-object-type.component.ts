import {Component, OnInit} from '@angular/core';
import {GetService} from "../../../Services/get.service";
import {ObjectType} from "../../../Interfaces/object_type.interface";
import {ObjectTypeGet} from "../../../Interfaces/object_type-get.interface";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-read-object-type',
  standalone: true,
  imports: [],
  templateUrl: './read-object-type.component.html',
  styleUrl: './read-object-type.component.scss'
})
export class ReadObjectTypeComponent implements OnInit {
  objectTypes!: ObjectType[];

  constructor(private getService: GetService, private router: Router) {
  }

  ngOnInit(): void {
    this.getService.getObjectTypes().subscribe({
      next: (response: ObjectTypeGet): void => {
        this.objectTypes = response.data
      },
      error: (error: HttpErrorResponse): void => {
        alert("Radās kļūda iegūstot datus no servera!")
      }
    })
  }

  onEdit(id: number): void {
    this.router.navigate(["crud", "update", "object-type", id])
  }
}
