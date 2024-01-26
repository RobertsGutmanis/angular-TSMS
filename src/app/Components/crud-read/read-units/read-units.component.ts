import {Component, OnInit} from '@angular/core';
import {GetService} from "../../../Services/get.service";
import {UnitGet} from "../../../Interfaces/unit-get.interface";
import {Unit} from "../../../Interfaces/unit.interface";
import {UnitTypeGetSingle} from "../../../Interfaces/unit_type-get-single.interface";
import {DisplayUnits} from "../../../Interfaces/display-units.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-read-units',
  standalone: true,
  imports: [],
  templateUrl: './read-units.component.html',
  styleUrl: './read-units.component.scss'
})
export class ReadUnitsComponent implements OnInit {
  displayUnits: DisplayUnits[] = [];

  constructor(private getService: GetService, private router: Router) {

  }

  ngOnInit(): void {
    this.getService.getUnits().subscribe({
      next: (response: UnitGet): void => {
        response.data.forEach((unit: Unit): void => {
          let currentUnit: DisplayUnits = {
            id: unit.id,
            object_id: unit.intersection_object_id,
            unit_type_id: unit.unit_type_id,
            unit_type: "",
            unit_placement_id: unit.unit_placement_id,
            serial_number: unit.serial_number,
            ipv4: unit.management_ipv4,
            ipv6: unit.management_ipv6
          }
          this.getService.getSingleUnitType(unit.unit_type_id).subscribe({
            next: (response: UnitTypeGetSingle): void => {
              currentUnit.unit_type = response.data.type;
              this.displayUnits.push(currentUnit)
            }
          })
        })
      }
    })
  }

  onEdit(id: number): void {
    this.router.navigate(["crud/update/unit", id])
  }

}
