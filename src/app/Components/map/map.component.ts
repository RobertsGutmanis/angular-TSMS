import {AfterViewInit, Component} from '@angular/core';
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import * as L from "leaflet";
import {Intersection} from "../../Interfaces/intersection.interfrace";
import {GetService} from "../../Services/get.service";
import {IntersectionGet} from "../../Interfaces/Intersection-get.interface";
import * as Marker from "../../markers";
import {IntersectionObjectGet} from "../../Interfaces/intersection_object-get.interface";
import {IntersectionObject} from "../../Interfaces/intersection_object.interface";
import {IntersectionGetSingle} from "../../Interfaces/intersection-get-single.interface";
import {HttpErrorResponse} from "@angular/common/http";
import {DisplayIntersectionObject} from "../../Interfaces/display-intersectionObject.interface";
import {ObjectTypeGetSingle} from "../../Interfaces/object-type-get-single.interface";
import {ObjectsExpandedGet} from "../../Interfaces/objects_expanded-get.interface";
import {ObjectsExpanded} from "../../Interfaces/objects_expanded.interface";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    LeafletModule
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {
  intersection: Intersection[] = []
  objects: ObjectsExpanded[] = []
  // @ts-ignore
  private map: any;

  constructor(private getService: GetService) {
  }

  ngAfterViewInit(): void {
    this.initMap();
    const layerGroup: any = L.layerGroup().addTo(this.map);
    let currentZoom: number = 14;

    this.fetchIntersections(layerGroup)

    this.map.on('zoomend', (event: any): void => {
      currentZoom = event.target._zoom
      this.fetchObjects(layerGroup, currentZoom)
      if (currentZoom <= 16) {
        layerGroup.clearLayers()
        this.fetchIntersections(layerGroup)
      }
    })
  }

  fetchIntersections(layerGroup: any): void {
    if (this.intersection.length === 0) {
      this.getService.getIntersections().subscribe({
        next: (response: IntersectionGet): void => {
          this.intersection = response.data
          this.showIntersections(layerGroup)
        },
        error: (erro: HttpErrorResponse): void => {
          alert("Radās kļūda iegūstot datus no servera!")
        }
      })
    } else {
      this.showIntersections(layerGroup)
    }
  }

  fetchObjects(layerGroup: any, currentZoom: number): void {
    if (this.objects.length === 0) {
      this.getService.getObjectsExpanded().subscribe({
        next: (response: ObjectsExpandedGet): void=>{
          this.objects = response.data
          console.log(this.objects[0])
        },
        error: (error: HttpErrorResponse): void=>{
          alert(error.error.message)
        }
      })
      this.getService.getIntersections().subscribe({
        next: (value: any): void=>{
          console.log(value.data[0])
        }
      })
      this.getService.getIntersectionObjects().subscribe({
        next: (value: any): void=>{
          console.log(value.data[0])
        }
      })
    } else {
      if (currentZoom >= 18) {
        layerGroup.clearLayers()
        this.showOBjects(layerGroup)
      }
    }
  }

  showIntersections(layerGroup: any): void {
    this.intersection.forEach((intersection: Intersection): void => {
      const myMarker: any = L.marker([intersection.latitude, intersection.longitude], {icon: Marker.blueIcon}).addTo(layerGroup);
      myMarker.bindPopup(`
            <h2 class="font-bold text-md">${intersection.title}</h2>
            <button onclick="my_modal_1.showModal()" class="px-5 py-1 w-full text-xs font-medium text-center inline-flex items-center justify-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">Info</button>
            <dialog id="my_modal_1" class="modal">
              <div class="modal-box">
                <h3 class="font-bold text-lg">${intersection.title}</h3>
                <p class="py-1">Latitude - ${intersection.latitude}</p>
                <p class="py-1">Longitude - ${intersection.longitude}</p>
                <p class="py-1">Radius - ${intersection.radius}</p>
                <div class="modal-action">
                  <form method="dialog">
                    <button class="btn btn-error text-white">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          `);
    })
  }

  showOBjects(layerGroup: any): void {
    this.objects.forEach((object: ObjectsExpanded): void => {
      const myMarker: any = L.marker([object.latitude, object.longitude], {icon: Marker.blueIcon}).addTo(layerGroup);
      myMarker.bindPopup(`
            <h2 class="font-bold text-md">${object.title}</h2>
            <button onclick="my_modal_1.showModal()" class="px-5 py-1 w-full text-xs font-medium text-center inline-flex items-center justify-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">Info</button>
            <dialog id="my_modal_1" class="modal">
              <div class="modal-box">
                <h3 class="font-bold text-lg">${object.title} - ${object.type}</h3>
                <p class="py-1">Latitude - ${object.latitude}</p>
                <p class="py-1">Longitude - ${object.longitude}</p>
                <p class="py-1">Objekta tips - ${object.type}</p>
                <p class="py-1">Krustojums - ${object.title}</p>
                <div class="modal-action">
                  <form method="dialog">
                    <button class="btn btn-error text-white">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          `);
    })
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [56.65126976898748, 23.728884557751268],
      zoomDelta: 1,
      zoom: 14
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom: 5,
    });
    tiles.addTo(this.map);
  }
}
