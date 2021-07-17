import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/core/services/product-service/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss', '../../../user/user-table/user-add/user-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  formFilled = true;
  date;
  hide = true;
  confirmhide = true;

  public product: Product = {
    name: '',
    unit: '',
    price: 0,
    description: '',
    dateAdded: new Date(),
    availableQuantity: 0,
  };



  productForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    unit: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    description: new FormControl(''),
    dateAdded: new FormControl('', Validators.required),
    availableQuantity: new FormControl('', Validators.required)
  });

  constructor(private productService: ProductService, private router: Router, private snackBar: MatSnackBar,
              public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.date = new Date().toString();
  }

  finish(): void {
      this.fillOutForm();
      this.productService.addProduct(this.product).subscribe(
        (response) => {
          this.formFilled = true;
          this.openSnackBar();
          this.router.navigate(['admin-home-page/product']);
        },
        (error) => {
          this.formFilled = false;
          console.log(error.error);
        }
      );
  }

  fillOutForm(): void {
    this.product.name = this.productForm.value.name;
    this.product.unit = this.productForm.value.unit;
    this.product.price = this.productForm.value.price;
    this.product.dateAdded = this.productForm.value.dateAdded;
    this.product.availableQuantity = this.productForm.value.availableQuantity;
    this.product.description = this.productForm.value.description;
  }

  openSnackBar(): void {
    this.snackBar.open('Product successfully added!', 'Close', {
      duration: 2000,
      panelClass: ['snackbar']
    });

  }

  backToProductTable(): void  {
    this.router.navigate([`/admin-home-page/product/`]);
  }


}
