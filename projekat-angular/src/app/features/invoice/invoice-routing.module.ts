import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceComponent } from './invoice.component';
import { InvoiceEditComponent } from './invoice-edit/invoice-edit.component';
import { InvoiceAddComponent } from './invoice-table/invoice-add/invoice-add.component';
import { InvoiceTableComponent } from './invoice-table/invoice-table.component';


const routes: Routes = [
  {path: '', component: InvoiceComponent, children: [
      { path: '', component: InvoiceTableComponent },
      { path: 'add-invoice', component: InvoiceAddComponent },
      { path: 'edit-invoice/:id', component: InvoiceEditComponent },
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
