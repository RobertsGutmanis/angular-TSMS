import {Component, OnInit} from '@angular/core';
import {GetService} from "../../../Services/get.service";
import {Intersection} from "../../../Interfaces/intersection.interfrace";
import {IntersectionGet} from "../../../Interfaces/Intersection-get.interface";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-read-intersection',
  standalone: true,
  imports: [],
  templateUrl: './read-intersection.component.html',
  styleUrl: './read-intersection.component.scss'
})
export class ReadIntersectionComponent implements OnInit {
  intersections!: Intersection[];

  constructor(private getService: GetService) {
  }

  ngOnInit(): void {
    this.getService.getIntersections().subscribe({
      next: (response: IntersectionGet): void => {
        this.intersections = response.data;
      },
      error: (error: HttpErrorResponse): void => {
        alert("Radās kļūda iegūstot datus no servera!")
      }
    })
  }
}
