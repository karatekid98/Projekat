import { Component, EventEmitter, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { LockService } from 'src/app/core/services/lock-service/lock.service';
import { LockItem } from 'src/app/models/lockItem';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';
import { InvoiceService } from '../../../core/services/invoice-service/invoice.service';
import { CustomerService } from '../../../core/services/customer-service/customer.service';
import { UserService } from 'src/app/core/services/user-service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-invoice-table',
  templateUrl: './invoice-table.component.html',
  styleUrls: ['./invoice-table.component.scss', '../../user/user-table/user-table.component.scss']
})
export class InvoiceTableComponent implements OnInit {

  @ViewChild('viewContainer', { read: ViewContainerRef }) viewContainer: ViewContainerRef;
  @Output() selectedTabChange: EventEmitter<MatTabChangeEvent>;
  displayedColumns: string[] = ['id', 'customer', 'user', 'name',  'isPrinted',
    'delete', 'read', 'edit'];

  defColToDisplay: string[];
  tabActive = '';
  lockedItems: Array<object> = [];
  editIndicator = false;
  tableOpened = true;
  userId;
  lockedItem: LockItem = {
    itemId: '',
    userId: ''
  };
  loggedUser;
  listOfLockedInvoices = [];
  dataSource;
  pageSize;
  totalSizeOfItems;
  currentPage;
  pageEvent;
  parametars: any = {
    pageNumber: 1,
    pageSize: 5
  };
  customer: any;
  user: any;

  constructor(private router: Router, private invoiceService: InvoiceService, private userService: UserService,
              public dialog: MatDialog, private lockService: LockService, private customerService: CustomerService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('userObject'));
    this.lockedItem.userId = this.loggedUser.id;
    this.editIndicator = true;
    this.showInvoices(this.parametars);
    this.defColToDisplay = this.displayedColumns;
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    if (tabChangeEvent.index === 0) {
      this.tabActive = 'invoices';
      this.showInvoices(this.parametars);
      this.displayedColumns = this.defColToDisplay;
    } else {
      this.tabActive = 'deletedinvoices';
      this.displayedColumns = this.displayedColumns.slice(0, 5);
      this.showDeletedInvoices(this.parametars);
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private showInvoices(parametars: any): void{
    this.invoiceService.getInvoices(this.parametars).subscribe((invoices) => {

      const metadata = invoices['metadata'];
      this.pageSize = metadata.pageSize;
      this.currentPage = metadata.currentPage;
      this.currentPage = this.currentPage - 1;
      this.totalSizeOfItems = metadata.totalCount;
      const list = invoices['pagedList'];
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < list.length; i++) {
        this.customerService.getCustomer(list[i].customerId).subscribe((customer) => {
          if (customer.name !== null) {
            this.customer = customer.name;
            list[i].name = this.customer;
          } else {
            this.customer = customer.firstName + ' ' + customer.lastName;
            list[i].customer = this.customer;
          }
        });
        this.userService.getUser(list[i].issuerId).subscribe((user) => {
          this.user = user.firstName + ' ' + user.lastName;
          list[i].user = this.user;
        });
      }

      this.getLockedInvoices(list);
      this.dataSource = new MatTableDataSource(list);

    });
  }
  private showDeletedInvoices(parametars: any): void {
    this.invoiceService.getDeletedInvoices(this.parametars).subscribe((invoices) => {
      const metadata = invoices['metadata'];
      this.pageSize = metadata.pageSize;
      this.currentPage = metadata.currentPage;
      this.currentPage = this.currentPage - 1;
      this.totalSizeOfItems = metadata.totalCount;
      const list = invoices['pagedList'];
      for (let i = 0; i < list.length; i++) {
        this.customerService.getCustomer(list[i].customerId).subscribe((customer) => {
          if (customer.name !== null) {
            this.customer = customer.name;
            list[i].name = this.customer;
          } else {
            this.customer = customer.firstName + ' ' + customer.lastName;
            list[i].customer = this.customer;
          }
        });
        this.userService.getUser(list[i].issuerId).subscribe((user) => {
          this.user = user.firstName + ' ' + user.lastName;
          list[i].user = this.user;
        });
      }
      this.dataSource = new MatTableDataSource(list);
    });
  }

  getLockedInvoices(allInvoices: any): void {
    allInvoices.forEach(invoice => {
      this.lockService.getIsItemLocked(invoice.id).subscribe((res) => {
        if (res) {
          this.listOfLockedInvoices.push(invoice.id);
        }
      });
    });
  }

  openDeleteModal(id: any): void{
    const dialogRef = this.dialog.open(DeleteModalComponent, {data: {id : id, component: 'invoice'}});
    dialogRef.afterClosed().subscribe(x => {
      this.showInvoices(this.parametars);
    });
   }


  handlePage(event: any): void {
    this.parametars.pageSize = event.pageSize;
    this.parametars.pageNumber = event.pageIndex + 1;
    if (this.tabActive === 'invoices') {
      this.showInvoices(this.parametars);
    } else {
      this.showDeletedInvoices(this.parametars);
    }
  }

  openInvoiceEditPage(id: any): void{
      this.lockService.getIsItemLocked(id).subscribe((result) => {
        if (result === false) {
              this.router.navigate([`/admin-home-page/invoice/edit-invoice/${id}`]);
              this.lockItem(id);
          } else {
            this.openSnackBar();
          }
      });
  }

  readInvoiceEditPage(id: any): void{
    localStorage.setItem('readPage', 'true');
    this.router.navigate([`/admin-home-page/invoice/edit-invoice/${id}`]);
  }

  lockItem(id: any): void {
    this.lockedItem.itemId = id;
    this.lockService.postLockItem(this.lockedItem).subscribe();
  }

  openSnackBar(): void {
    this.snackBar.open('Invoice is currently being modified! Try again later.', 'Close', {
      duration: 4000,
      panelClass: ['snackbar']
    });
  }
}
