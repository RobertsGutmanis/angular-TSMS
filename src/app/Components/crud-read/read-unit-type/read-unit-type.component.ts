import {Component, OnInit} from '@angular/core';
import {UnitType} from "../../../Interfaces/unit_type.interface";
import {GetService} from "../../../Services/get.service";
import {UnitTypeGet} from "../../../Interfaces/unit_type-get.interface";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-read-unit-type',
  standalone: true,
  imports: [],
  templateUrl: './read-unit-type.component.html',
  styleUrl: './read-unit-type.component.scss'
})
export class ReadUnitTypeComponent implements OnInit {
  unitTypes!: UnitType[];

  constructor(private getService: GetService) {
  }

  ngOnInit(): void {
    this.getService.getUnitTypes().subscribe({
      next: (response: UnitTypeGet): void => {
        this.unitTypes = response.data;
      },
      error: (error: HttpErrorResponse): void => {
        alert("Radās kļūda iegūstot datus no servera!")
      }
    })
  }
}
