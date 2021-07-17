import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { CustomerTableComponent } from './customer-table/customer-table.component';
import { CustomerAddComponent } from './customer-table/customer-add/customer-add.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';


const routes: Routes = [
  {path: '', component: CustomerComponent, children: [
      { path: '', component: CustomerTableComponent },
      { path: 'add-customer', component: CustomerAddComponent },
      { path: 'edit-customer/:id', component: CustomerEditComponent },
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
