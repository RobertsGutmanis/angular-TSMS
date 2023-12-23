import {Routes} from '@angular/router';
import {MapComponent} from "./Components/map/map.component";
import {CrudComponent} from "./Components/crud/crud.component";
import {IntersectionFormComponent} from "./Components/crud-create/intersection-form/intersection-form.component";
import {
  IntersectionObjectFormComponent
} from "./Components/crud-create/intersection-object-form/intersection-object-form.component";
import {ObjectTypeFormComponent} from "./Components/crud-create/object-type-form/object-type-form.component";
import {PropertiesFormComponent} from "./Components/crud-create/properties-form/properties-form.component";
import {UnitPlacementFormComponent} from "./Components/crud-create/unit-placement-form/unit-placement-form.component";
import {UnitTypeFormComponent} from "./Components/crud-create/unit-type-form/unit-type-form.component";
import {UnitsFormComponent} from "./Components/crud-create/units-form/units-form.component";
import {ReadIntersectionComponent} from "./Components/crud-read/read-intersection/read-intersection.component";
import {CrudReadComponent} from "./Components/crud-read/crud-read.component";
import {CrudCreateComponent} from "./Components/crud-create/crud-create.component";
import {
  ReadIntersectionObjectComponent
} from "./Components/crud-read/read-intersection-object/read-intersection-object.component";
import {ReadObjectTypeComponent} from "./Components/crud-read/read-object-type/read-object-type.component";
import {ReadUnitTypeComponent} from "./Components/crud-read/read-unit-type/read-unit-type.component";
import {
  ReadUnitPlacemenetsComponent
} from "./Components/crud-read/read-unit-placemenets/read-unit-placemenets.component";
import {ReadPropertiesComponent} from "./Components/crud-read/read-properties/read-properties.component";
import {ReadUnitsComponent} from "./Components/crud-read/read-units/read-units.component";
import {UpdateIntersectionComponent} from "./Components/crud-update/update-intersection/update-intersection.component";
import {UpdateUnitTypeComponent} from "./Components/crud-update/update-unit-type/update-unit-type.component";
import {
  UpdateUnitPlacemenetComponent
} from "./Components/crud-update/update-unit-placemenet/update-unit-placemenet.component";
import {UpdatePropertyComponent} from "./Components/crud-update/update-property/update-property.component";
import {UpdateObjectTypeComponent} from "./Components/crud-update/update-object-type/update-object-type.component";

export const routes: Routes = [
  {path: '', component: MapComponent},
  {
    path: 'crud', component: CrudComponent, children: [
      {
        path: 'create', component: CrudCreateComponent, children: [
          {path: 'intersection', component: IntersectionFormComponent},
          {path: 'intersection-object', component: IntersectionObjectFormComponent},
          {path: 'object-type', component: ObjectTypeFormComponent},
          {path: 'units', component: UnitsFormComponent},
          {path: 'properties', component: PropertiesFormComponent},
          {path: 'unit-placement', component: UnitPlacementFormComponent},
          {path: 'unit-type', component: UnitTypeFormComponent},
        ]
      },
      {
        path: 'read', component: CrudReadComponent, children: [
          {path: 'intersection', component: ReadIntersectionComponent},
          {path: 'intersection-object', component: ReadIntersectionObjectComponent},
          {path: 'object-type', component: ReadObjectTypeComponent},
          {path: 'unit-type', component: ReadUnitTypeComponent},
          {path: 'unit-placements', component: ReadUnitPlacemenetsComponent},
          {path: 'properties', component: ReadPropertiesComponent},
          {path: 'units', component: ReadUnitsComponent},
        ]
      },
      {
        path: 'update', children: [
          {path: 'intersection/:id', component: UpdateIntersectionComponent},
          {path: 'unit-type/:id', component: UpdateUnitTypeComponent},
          {path: 'unit-placement/:id', component: UpdateUnitPlacemenetComponent},
          {path: 'property/:id', component: UpdatePropertyComponent},
          {path: 'object-type/:id', component: UpdateObjectTypeComponent},
        ]
      }
    ]
  },
  {path: "**", redirectTo: 'crud/create'}
];
