import {Component} from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-crud-create',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  templateUrl: './crud-create.component.html',
  styleUrl: './crud-create.component.scss'
})
export class CrudCreateComponent {
  formType: string = ""

  constructor(private router: Router) {
  }

  onSelected(value: any): void {
    this.formType = value.target.value
    switch (this.formType) {
      case "Krustojums":
        this.router.navigate(["crud/create/intersection"]);
        break;
      case "Krustojuma objekts":
        this.router.navigate(["crud/create/intersection-object"])
        break;
      case "Objekta tips":
        this.router.navigate(["crud/create/object-type"])
        break;
      case "Vienības":
        this.router.navigate(["crud/create/units"])
        break;
      case "Īpašības":
        this.router.navigate(["crud/create/properties"])
        break;
      case "Vienības novietojums":
        this.router.navigate(["crud/create/unit-placement"])
        break;
      case "Vienības tips":
        this.router.navigate(["crud/create/unit-type"])
        break;
    }

  }
}
