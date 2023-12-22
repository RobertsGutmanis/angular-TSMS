import {AfterViewInit, Component, OnInit} from '@angular/core';
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import * as L from "leaflet";
import {Intersection} from "../../Interfaces/intersection.interfrace";
import {GetService} from "../../Services/get.service";
import {IntersectionGet} from "../../Interfaces/Intersection-get.interface";
import "leaflet/dist/images/marker-shadow.png";
import * as Marker from "../../markers";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    LeafletModule
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit{
  intersection: Intersection[] = []
  // @ts-ignore
  private map;

  private initMap(): void {
    this.map = L.map('map', {
      center: [56.65126976898748, 23.728884557751268 ],
      zoom: 14
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom: 5,
    });
    tiles.addTo(this.map);
  }

  constructor(private getService: GetService) {}

  ngAfterViewInit(): void {
    this.initMap();

    this.getService.getIntersections().subscribe({
      next: (response: IntersectionGet): void=>{
        response.data.forEach((intersection: Intersection): void=>{
          const myMarker = L.marker([intersection.latitude, intersection.longitude], {icon: Marker.blueIcon}).addTo(this.map);
          myMarker.bindPopup(`
            <h2 class="font-bold text-md">${intersection.title}</h2>
            <button class="px-5 py-1 w-full text-xs font-medium text-center inline-flex items-center justify-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">Info</button>
          `);
        })
      }
    })
  }
}
