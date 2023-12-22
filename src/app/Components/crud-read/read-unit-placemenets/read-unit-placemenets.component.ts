import {Component, OnInit} from '@angular/core';
import {UnitPlacemenet} from "../../../Interfaces/unit_placement.interface";
import {GetService} from "../../../Services/get.service";
import {UnitPlacementGet} from "../../../Interfaces/unit_placemenet-get.interface";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-read-unit-placemenets',
  standalone: true,
  imports: [],
  templateUrl: './read-unit-placemenets.component.html',
  styleUrl: './read-unit-placemenets.component.scss'
})
export class ReadUnitPlacemenetsComponent implements OnInit {
  placemenets!: UnitPlacemenet[];

  constructor(private getService: GetService) {
  }

  ngOnInit(): void {
    this.getService.getUnitPlacemenets().subscribe({
      next: (response: UnitPlacementGet): void => {
        this.placemenets = response.data
        console.log(this.placemenets)
      },
      error: (error: HttpErrorResponse): void => {
        alert("Radās kļūda iegūstot datus no servera!")
      }
    })
  }
}
