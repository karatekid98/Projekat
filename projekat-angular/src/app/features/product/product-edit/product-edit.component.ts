import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LockService } from 'src/app/core/services/lock-service/lock.service';
import { ProductService } from 'src/app/core/services/product-service/product.service';
import { Product } from 'src/app/models/product';
import { EditModalComponent } from 'src/app/shared/edit-modal/edit-modal.component';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss', '../../user/user-table/user-add/user-add.component.scss']
})
export class ProductEditComponent implements OnInit {
  hide = true;
  confirmhide = true;
  formFilled = true;
  id: any;
  hasChange = false;
  initalValues: any;
  pageHeader = 'Edit product';
  isButtonVisible = true;
  date;

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

  @HostListener('window:popstate', ['$event'])
  onPopState(event): void {
    this.unlockItem(localStorage.getItem('lockedItem'));
    localStorage.removeItem('lockedItem');
  }



  constructor(private route: ActivatedRoute, private productService: ProductService,
              private router: Router,  public dialog: MatDialog,
              private lockService: LockService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.date = new Date().toString();
    if (localStorage.getItem('lockedItem') === null) {
      this.pageHeader = 'Read-only product';
      this.isButtonVisible = false;
      this.productForm.disable();
    }
    this.id = this.getUrlParams();
    this.productService.getProduct(this.id).subscribe((product) => {

      this.productForm.patchValue(product);

      this.initalValues = this.productForm.value;

    });

  }

  backToProductTable(): void {
    if (this.initalValues !== this.productForm.value) {
      this.openGoBackModal();
    } else {
      const itemId = localStorage.getItem('lockedItem');
      if (itemId !== null) {
        this.unlockItem(itemId);
        localStorage.removeItem('lockedItem');
        this.router.navigate([`/admin-home-page/product`]);
      } else {
        this.router.navigate([`/admin-home-page/product`]);
      }
    }
  }

  submit(): void {
    this.fillOutForm();

    if (this.productForm.valid) {
      this.productService.updateProduct(this.product, this.id).subscribe(
        (response) => {

          this.formFilled = true;
          localStorage.removeItem('lockedItem');
          this.unlockItem(this.id);
          this.openSnackBar();
          this.router.navigate(['admin-home-page/product']);
        },
        (error) => {
          this.formFilled = false;
          console.log(error.error);
        }
      );
    } else {
      this.formFilled = false;
    }
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
    this.snackBar.open('Product successfully edited!', 'Close', {
      duration: 2000,
      panelClass: ['snackbar']
    });

  }

  getUrlParams(): any {
    const newLocal = '_routerState';
    const url = this.route[newLocal].snapshot.url;
    const n = url.lastIndexOf('/');
    const result = url.substring(n + 1);

    return result;
  }

  openGoBackModal(): void{
    const dialogRef = this.dialog.open(EditModalComponent , {data: {component: 'product'}});
   }

   unlockItem(lockedItemId: any): void {
    this.lockService.postUnlockItem(lockedItemId).subscribe();
   }
}
