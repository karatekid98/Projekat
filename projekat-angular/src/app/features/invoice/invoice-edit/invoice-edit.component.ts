import { Observable, ReplaySubject } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/core/services/customer-service/customer.service';
import { LockService } from 'src/app/core/services/lock-service/lock.service';
import { Customer } from 'src/app/models/customer';
import { Invoice } from 'src/app/models/invoice';
import { LockItem } from 'src/app/models/lockItem';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { EditModalComponent } from 'src/app/shared/edit-modal/edit-modal.component';
import { InvoiceService } from '../../../core/services/invoice-service/invoice.service';
import { ProductService } from '../../../core/services/product-service/product.service';
import { UserService } from '../../../core/services/user-service/user.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { InvoiceProductService } from '../../../core/services/invoice-product-service/invoice-product.service';
import { ProductAddComponent } from '../../product/product-table/product-add/product-add.component';
import { AddInvoiceProductComponent } from './add-invoice-product-modal/add-invoice-product.component';

@Component({
  selector: 'app-invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.scss', '../../user/user-table/user-add/user-add.component.scss']
})
export class InvoiceEditComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @ViewChild(MatTable) table: MatTable<any>;

  displayedColumns: string[] = ['name', 'unit', 'price',
                                'dateAdded', 'quantity'];
  customerPerson = true;
  selected = 'Female';
  formFilled = true;
  id: any;
  initalValues: any;
  initalValuesUser: any;
  initalValuesCustomer: any;
  invoiceUserId: any;
  invoiceCustomerId: any;
  pageHeader = 'Edit invoice';
  isButtonVisible = true;
  panelOpenState = false;
  product: any;
  lockedItem: LockItem = {
    itemId: '',
    userId: ''
  };
  dataSource;
  pageSize;
  totalSizeOfItems;
  currentPage;
  pageEvent;
  parametars: any = {
    pageNumber: 1,
    pageSize: 5
  };

  // dataToDisplay = [...ELEMENT_DATA];

  // dataSource = new ExampleDataSource(this.dataToDisplay);


  public invoice: Invoice = {
      date: null,
      customerId: null,
      issuerId: null,
      isPrinted: false,
      shipments: null,
      invoiceProducts: null,
      user: null,
      customer: null,
      isDeleted: false
  };

  public user: User = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    gender: '',
    dateOfBirth: null,
    role: null,
    addressId: null,
};

  public customer: Customer = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    companyNumber: '',
    addressId: null,
    name: ''
};

  detailForm: FormGroup = new FormGroup({
    invoiceDate: new FormControl(null, Validators.required),
    customerId: new FormControl('', Validators.required),
    issuerId: new FormControl('', Validators.required)
  });

  customerForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    companyNumber: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
  });


  // TODO: PREPRAVI USER FORMU
  userForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    dateofBirth: new FormControl('', Validators.required),
  });



  @HostListener('window:popstate', ['$event'])
  onPopState(event): void {
    this.unlockItem(localStorage.getItem('lockedItem'));
    localStorage.removeItem('lockedItem');
  }

  constructor(private route: ActivatedRoute, private invoiceService: InvoiceService,
              private router: Router,  public dialog: MatDialog, private customerService: CustomerService,
              private userService: UserService, private productService: ProductService,
              private invoiceProductService: InvoiceProductService,
              private lockService: LockService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.lockedItem.userId = localStorage.getItem('userId');


    if (localStorage.getItem('lockedItem') === null) {
      this.pageHeader = 'Read-only invoice';
      this.isButtonVisible = false;
      this.detailForm.disable();
      this.customerForm.disable();
      this.userForm.disable();
    }
    this.id = this.getUrlParams();
    this.invoiceService.getInvoice(this.id).subscribe((invoice) => {
      this.invoice.customerId = invoice.customerId;
      this.invoice.issuerId = invoice.issuerId;
      this.invoice.id = invoice.id;
      this.customer.id = invoice.customerId;
      this.user.id = invoice.issuerId;


      this.invoiceUserId = invoice.issuerId;
      this.invoiceCustomerId = invoice.customerId;
      this.detailForm.patchValue(invoice);

      this.patchUserForm();
      this.patchCustomerForm();
      this.initalValues = this.detailForm.value;
      this.showProducts();
    });

  }

  patchUserForm(): void {
    this.userService.getUser(this.invoiceUserId).subscribe((user) => {
      this.userForm.patchValue(user);
      console.log(user.dateOfBirth);

      this.customerForm.patchValue({
        dateOfBirth: user.dateOfBirth,
     });
      this.initalValuesUser = this.userForm.value;
    });
  }

  patchCustomerForm(): void {
    this.customerService.getCustomer(this.invoiceCustomerId).subscribe((customer) => {
      this.customerForm.patchValue(customer);
      this.customerForm.patchValue({
         gender: customer.gender,
      });
      this.initalValuesCustomer = this.customerForm.value;
      if (customer.firstName === '') {
        this.customerPerson = false;
      }
    });
  }

  backToInvoiceTable(): void {
    if (this.initalValues !== this.detailForm.value ||
        this.initalValuesUser !== this.userForm.value ||
        this.initalValuesCustomer !== this.customerForm.value) {
            this.openGoBackModal();
    } else {
      const itemId = localStorage.getItem('lockedItem');
      if (itemId !== null) {
        this.unlockItem(itemId);
        localStorage.removeItem('lockedItem');
        this.router.navigate([`/admin-home-page/invoice`]);
      } else {
        this.router.navigate([`/admin-home-page/invoice`]);
      }
    }
  }

  submit(): void {
    this.fillOutForm();

    if (this.detailForm.valid && this.userForm.valid && this.customerForm.valid) {
      this.invoiceService.updateInvoice(this.invoice, this.id).subscribe(
        (response) => {
          this.updateUser(this.invoiceUserId);
          this.formFilled = true;
          localStorage.removeItem('lockedItem');
          this.unlockItem(this.id);
          this.openSnackBar();
          this.router.navigate(['admin-home-page/invoice']);
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

  updateUser(userId: any): void {
    this.userService.updateUser(this.user, userId).subscribe();
  }

  fillOutForm(): void {
    this.invoice.date = this.detailForm.value.invoiceDate;
    this.invoice.issuerId = this.detailForm.value.issuerId;
    this.invoice.customerId = this.detailForm.value.customerId;

    this.customer.firstName = this.customerForm.value.customerFirstName;
    this.customer.lastName = this.customerForm.value.customerLastName;
    this.customer.gender = this.customerForm.value.customerGender;
    this.customer.email = this.customerForm.value.customerEmail;
    this.customer.phone = this.customerForm.value.customerPhone;
    this.customer.companyNumber = this.customerForm.value.customerCompanyNumber;
    this.customer.name = this.customerForm.value.customerCompanyName;

    this.user.firstName = this.userForm.value.firstName;
    this.user.lastName = this.userForm.value.lastName;
    this.user.phone = this.userForm.value.phone;
    this.user.dateOfBirth = this.userForm.value.dateofBirth;
    this.user.gender = this.userForm.value.gender;
  }

  openSnackBar(): void {
    this.snackBar.open('Invoice successfully edited!', 'Close', {
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
    const dialogRef = this.dialog.open(EditModalComponent , {data: {component: 'invoice'}});
   }

   editCustomer(): void {
    this.lockService.getIsItemLocked(this.invoiceCustomerId).subscribe((result) => {
      if (result === false) {
            this.router.navigate([`/admin-home-page/customer/edit-customer/${this.invoiceCustomerId}`]);
            this.lockItem(this.invoiceCustomerId);
        }
    });
   }

   editUser(): void {
    this.lockService.getIsItemLocked(this.invoiceUserId).subscribe((result) => {
      if (result === false) {
            this.router.navigate([`/admin-home-page/user/edit-user/${this.invoiceUserId}`]);
            this.lockItem(this.invoiceUserId);
        }
    });
   }

   unlockItem(lockedItemId: any): void {
    this.lockService.postUnlockItem(lockedItemId).subscribe();
   }

   lockItem(id: any): void {
    this.unlockItem(this.id);
    this.lockedItem.itemId = id;
    localStorage.setItem('lockedItem', id);
    //this.lockedItems.push(this.lockedItem.itemId);
    this.lockService.postLockItem(this.lockedItem).subscribe();
  }

  // TODO: zavris metodu, napravi modalni prozor za dodavanje novog proizvoda i dodaj korpu za brisanje proizvoda sa fakture
  openDialog(): void {
    const dialogRef = this.dialog.open(AddInvoiceProductComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.showProducts();
    });
  }



  removeProduct(): void {

  }

  showProducts(): void{
    this.invoiceProductService.getOneInvoiceProducts(this.id).subscribe((invproducts) => {
      // this.dataSource = new MatTableDataSource(products);

      const list = invproducts;
      for (let i = 0; i < list.length; i++) {
        this.productService.getProduct(list[i].productId).subscribe((product) => {
          if (product.name !== null) {
            list[i].name = product.name;

          }
        });
      }
      this.dataSource = new MatTableDataSource(list);
    });
  }
}


// class ExampleDataSource extends DataSource<Product> {
//   private _dataStream = new ReplaySubject<Product[]>();

//   constructor(initialData: Product[]) {
//     super();
//     this.setData(initialData);
//   }

//   connect(): Observable<Product[]> {
//     return this._dataStream;
//   }

//   disconnect(): void {}

//   setData(data: Product[]): void {
//     this._dataStream.next(data);
//   }
// }
