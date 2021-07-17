import { NgModule } from '@angular/core';
import { ProductComponent } from './product.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductAddComponent } from './product-table/product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';


const routes: Routes = [
  {path: '', component: ProductComponent, children: [
      { path: '', component: ProductTableComponent },
      { path: 'add-product', component: ProductAddComponent },
      { path: 'edit-product/:id', component: ProductEditComponent },
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
