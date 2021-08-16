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

  lockedItems: Array<object> = [];
  editIndicator = false;
  tableOpened = true;
  userId;
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
  customer: any;
  user: any;

  constructor(private router: Router, private invoiceService: InvoiceService, private userService: UserService,
              public dialog: MatDialog, private lockService: LockService, private customerService: CustomerService) { }

  ngOnInit(): void {

    this.lockedItem.userId = localStorage.getItem('userId');
    const lockedItem = localStorage.getItem('lockedItem');
    if (lockedItem !== null) {
      this.editIndicator = true;
      this.lockedItem.itemId = lockedItem;
    }

    this.showInvoices(this.parametars);
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    if (tabChangeEvent.index === 0) {
      this.showInvoices(this.parametars);
    } else {
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

  openDeleteModal(id: any): void{
    const dialogRef = this.dialog.open(DeleteModalComponent, {data: {id : id, component: 'invoice'}});
    dialogRef.afterClosed().subscribe(x => {
      this.showInvoices(this.parametars);
    });
   }


  handlePage(event: any): void {
    this.parametars.pageSize = event.pageSize;
    this.parametars.pageNumber = event.pageIndex + 1;
    this.showInvoices(this.parametars);
  }

  openInvoiceEditPage(id: any): void{
      this.lockService.getIsItemLocked(id).subscribe((result) => {
        if (result === false) {
              this.router.navigate([`/admin-home-page/invoice/edit-invoice/${id}`]);
              this.lockItem(id);
          }
      });
  }

  readInvoiceEditPage(id: any): void{
    this.router.navigate([`/admin-home-page/invoice/edit-invoice/${id}`]);
  }

  lockItem(id: any): void {
    this.lockedItem.itemId = id;
    localStorage.setItem('lockedItem', id);
    this.lockedItems.push(this.lockedItem.itemId);
    this.lockService.postLockItem(this.lockedItem).subscribe();
  }
}
