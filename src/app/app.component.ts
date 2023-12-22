import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigationEnd, Router, RouterLink, RouterOutlet} from '@angular/router';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LeafletModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  view: string = "map"

  constructor(private router: Router) {
    router.events.subscribe((val): void => {
      if (val instanceof NavigationEnd) {
        if (val.url != "/") {
          this.view = "crud"
        } else {
          this.view = "map"
        }
      }
    });
  }

  changeView(view: any): void {
    this.view = view.target.classList;
    console.log(this.view)
  }

}
