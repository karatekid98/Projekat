import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user-service/user.service';
import { AddressService } from '../../core/services/address-service/address.service';
import { InvoiceService } from '../../core/services/invoice-service/invoice.service';
import { ProductService } from 'src/app/core/services/product-service/product.service';
import { CustomerService } from 'src/app/core/services/customer-service/customer.service';
import { InvoiceProductService } from '../../core/services/invoice-product-service/invoice-product.service';
@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {
  component = '';
  public id: any;
   constructor(private router: Router,
               private userService: UserService,
               private addressService: AddressService,
               private invoiceService: InvoiceService,
               private productService: ProductService,
               private customerService: CustomerService,
               private invoiceProductService: InvoiceProductService,
               private dialogRef: MatDialogRef<DeleteModalComponent>,
               @Inject(MAT_DIALOG_DATA) public data) { }


  ngOnInit(): void {
  }

  softDelete(id: any): void{
    if (this.data.component === 'user') {
      this.userService.softDeleteUser(id).subscribe();
    } else if (this.data.component === 'address') {
      this.addressService.softDeleteAddress(id).subscribe();
    }else if (this.data.component === 'invoice') {
      this.invoiceService.softDeleteInvoice(id).subscribe();
    }else if (this.data.component === 'product') {
      this.productService.softDeleteProduct(id).subscribe();
    }else if (this.data.component === 'customer') {
      this.customerService.softDeleteCustomer(id).subscribe();
    }else if (this.data.component === 'invoiceProduct') {
      this.invoiceProductService.softDeleteInvoiceProducts(id).subscribe();
    }
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}


