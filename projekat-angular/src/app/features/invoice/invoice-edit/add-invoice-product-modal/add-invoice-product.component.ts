import { logging } from 'protractor';
import { HttpResponseBase } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from '../../../../core/services/product-service/product.service';
import { InvoiceProduct } from '../../../../models/invoiceProduct';
import { InvoiceProductService } from '../../../../core/services/invoice-product-service/invoice-product.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { exit } from 'process';

@Component({
  selector: 'app-add-invoice-product',
  templateUrl: './add-invoice-product.component.html',
  styleUrls: ['./add-invoice-product.component.scss', '../../../user/user-table/user-add/user-add.component.scss']
})
export class AddInvoiceProductComponent implements OnInit {
  formFilled = true;
  date;
  hide = true;
  confirmhide = true;
  public products: Product[];
  selectedProductId?: any;
  productsfrm = new FormControl();
  productExists = false;
  public invoiceProduct: InvoiceProduct = {
    name: '',
    unit: '',
    price: 0,
    description: '',
    quantity: 0,
    invoiceId: '',
    productId: '',
    product: null,
    invoice: null,
    isDeleted: false
  };

  productForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    unit: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required)
  });


  constructor(private productService: ProductService,
              private dialogRef: MatDialogRef<AddInvoiceProductComponent>,
              private invoiceProductService: InvoiceProductService,
              private router: Router, private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.getProducts();
  }

  finish(): void{
    this.fillOutForm();

    this.invoiceProductService.getOneInvoiceProducts(this.data.invoiceId).subscribe(
      (response) => {
        response.forEach(invoiceProduct => {
          if (invoiceProduct.productId === this.selectedProductId) {
            this.productExists = true;
          }
        });
        if (!this.productExists) {
          this.addNewProduct();
        }
        else {
          this.openErrorSnackBar();
        }
      },
      (error) => {
        console.log(error.error);
      }
    );


  }

  addNewProduct(): void {
    this.invoiceProduct.invoiceId = this.data.invoiceId;


    this.invoiceProductService.addInvoiceProduct(this.invoiceProduct).subscribe(
      (response) => {
        this.formFilled = true;
        this.openSnackBar();
        this.dialogRef.close();
      },
      (error) => {
        this.formFilled = false;
        console.log(error.error);
      }
    );
  }

  fillOutForm(): void {
    this.invoiceProduct.name = this.productForm.value.name;
    this.invoiceProduct.unit = this.productForm.value.unit;
    this.invoiceProduct.price = this.productForm.value.price;
    this.invoiceProduct.quantity = this.productForm.value.quantity;
    this.invoiceProduct.invoiceId =   localStorage.getItem('lockedItem');
    this.invoiceProduct.productId = this.selectedProductId;
  }

  openSnackBar(): void {
    this.snackBar.open('Product successfully added!', 'Close', {
      duration: 2000,
      panelClass: ['snackbar']
    });
  }

  openErrorSnackBar(): void {
    this.snackBar.open('Product already exists!', 'Close', {
      duration: 2000,
      panelClass: ['snackbar']
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  getProducts(): void {
    this.productService.getProductsNoPag().subscribe(
      (response) => {
        this.products = response;
      },
      (error) => {
        console.log(error.error);
      }
    );
  }
  updateData(target: any): void {
    if (target !== '' || this.products.length !== undefined) {
      this.products.forEach(product => {
         if (target === product.id) {
          this.selectedProductId = target;
          this.productForm.patchValue(product);
            // this.productForm.get('price').disable();
            // this.productForm.get('unit').disable();
         }
      });
    }
  }
}
