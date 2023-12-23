import {Component, OnInit} from '@angular/core';
import {GetService} from "../../../Services/get.service";
import {PropertyGet} from "../../../Interfaces/property-get.interface";
import {Property} from "../../../Interfaces/property.interface";
import {UnitGetSingle} from "../../../Interfaces/unit-get-single.interface";
import {PropertyDisplay} from "../../../Interfaces/display-property.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-read-properties',
  standalone: true,
  imports: [],
  templateUrl: './read-properties.component.html',
  styleUrl: './read-properties.component.scss'
})
export class ReadPropertiesComponent implements OnInit {
  propertiesToDisplay: PropertyDisplay[] = [];

  constructor(private getService: GetService, private router: Router) {
  }

  ngOnInit(): void {
    this.getService.getProperties().subscribe({
      next: (response: PropertyGet): void => {
        response.data.forEach((property: Property): void => {
          let currentProperty: PropertyDisplay = {
            id: property.id,
            serial_number: "",
            parent_id: property.parent_id,
            key: property.key,
            value: property.value
          }
          if (property.unit_id) {
            currentProperty.parent_id = 0;
            this.getService.getSingleUnit(property.unit_id).subscribe({
              next: (response: UnitGetSingle): void => {
                currentProperty.serial_number = response.data.serial_number
                this.propertiesToDisplay.push(currentProperty)
              }
            })
          } else {
            currentProperty.serial_number = "0"
            this.propertiesToDisplay.push(currentProperty)
          }
        })
      }
    })
  }

  onEdit(id: number): void {
    this.router.navigate(["crud", "update", "property", id])
  }
}
