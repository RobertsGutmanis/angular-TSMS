import {Component} from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-crud-read',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './crud-read.component.html',
  styleUrl: './crud-read.component.scss'
})
export class CrudReadComponent {
  tableType: string = "none"

  constructor(private router: Router) {
  }

  onSelected(value: any): void {
    this.tableType = value.target.value
    switch (this.tableType) {
      case "Krustojums":
        this.router.navigate(["crud/read/intersection"]);
        break;
      case "Krustojuma objekts":
        this.router.navigate(["crud/read/intersection-object"])
        break;
      case "Objekta tips":
        this.router.navigate(["crud/read/object-type"])
        break;
      case "Vienības":
        this.router.navigate(["crud/read/units"])
        break;
      case "Īpašības":
        this.router.navigate(["crud/read/properties"])
        break;
      case "Vienības novietojums":
        this.router.navigate(["crud/read/unit-placements"])
        break;
      case "Vienības tips":
        this.router.navigate(["crud/read/unit-type"])
        break;
    }
  }
}
