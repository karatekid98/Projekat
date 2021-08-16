import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './address.component';
import { AddressTableComponent } from './address-table/address-table.component';
import { AddressAddComponent } from './address-table/address-add/address-add.component';
import { AddressEditComponent } from './address-edit/address-edit.component';


const routes: Routes = [
  {path: '', component: AddressComponent, children: [
      { path: '', component: AddressTableComponent },
      { path: 'add-address', component: AddressAddComponent },
      { path: 'edit-address/:id', component: AddressEditComponent },
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AddressRoutingModule { }
