import { Component, ComponentFactoryResolver, EventEmitter, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { LockService } from 'src/app/core/services/lock-service/lock.service';
import { LockItem } from 'src/app/models/lockItem';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';
import { CustomerService } from '../../../core/services/customer-service/customer.service';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.scss', '../../user/user-table/user-table.component.scss']
})
export class CustomerTableComponent implements OnInit {

  @ViewChild('viewContainer', { read: ViewContainerRef }) viewContainer: ViewContainerRef;
  @Output() selectedTabChange: EventEmitter<MatTabChangeEvent>;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'gender',
    'email', 'phone', 'companyNumber',
    'delete', 'read', 'edit'];

  defColToDisplay: string[];
  tabActive = '';
  lockedItems: Array<object> = [];
  editIndicator = false;
  tableOpened = true;
  customerId;
  lockedItem: LockItem = {
    itemId: '',
    userId: ''
  };
  user;
  listOfLockedCustomers = [];
  dataSource;
  pageSize;
  totalSizeOfItems;
  currentPage;
  pageEvent;
  parametars: any = {
    pageNumber: 1,
    pageSize: 5
  };
  show = true;

  constructor(private router: Router, private customerService: CustomerService,
              public dialog: MatDialog, private resolver: ComponentFactoryResolver, private lockService: LockService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem('userObject'));
    this.lockedItem.userId = this.user.id;
    this.editIndicator = true;
    this.showCustomers(this.parametars);
    this.defColToDisplay = this.displayedColumns;
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    if (tabChangeEvent.index === 0) {
      this.tabActive = 'customers';
      this.showCustomers(this.parametars);
      this.displayedColumns = this.defColToDisplay;
    } else {
      this.tabActive = 'deletedcustomers';
      this.displayedColumns = this.displayedColumns.slice(0, 7);
      this.showDeletedCustomers(this.parametars);
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private showCustomers(parametars: any): void{
    this.customerService.getCustomers(this.parametars).subscribe((users) => {
      const metadata = users['metadata'];
      this.pageSize = metadata.pageSize;
      this.currentPage = metadata.currentPage;
      this.currentPage = this.currentPage - 1;
      this.totalSizeOfItems = metadata.totalCount;
      const listOfCustomers = users['pagedList'];
      this.getLockedCustomers(listOfCustomers);
      this.dataSource = new MatTableDataSource(listOfCustomers);
    });
  }

  private showDeletedCustomers(parametars: any): void {
    this.customerService.getDeletedCustomers(this.parametars).subscribe((users) => {
      const metadata = users['metadata'];
      this.pageSize = metadata.pageSize;
      this.currentPage = metadata.currentPage;
      this.currentPage = this.currentPage - 1;
      this.totalSizeOfItems = metadata.totalCount;
      const listOfCustomers = users['pagedList'];
      this.dataSource = new MatTableDataSource(listOfCustomers);
    });
  }

  getLockedCustomers(allCustomers: any): void {
    allCustomers.forEach(customer => {
      this.lockService.getIsItemLocked(customer.id).subscribe((res) => {
        if (res) {
          this.listOfLockedCustomers.push(customer.id);
        }
      });
    });
  }

  openDeleteModal(id: any): void{
    const dialogRef = this.dialog.open(DeleteModalComponent, {data: {id : id, component: 'customer'}});
    dialogRef.afterClosed().subscribe(x => {
      this.showCustomers(this.parametars);
    });
   }

  handlePage(event: any): void {
    this.parametars.pageSize = event.pageSize;
    this.parametars.pageNumber = event.pageIndex + 1;
    if (this.tabActive === 'customers') {
      this.showCustomers(this.parametars);
    } else {
      this.showDeletedCustomers(this.parametars);
    }

  }

  openCustomerEditPage(id: any): void{
      this.lockService.getIsItemLocked(id).subscribe((result) => {
        if (result === false) {
              this.router.navigate([`/admin-home-page/customer/edit-customer/${id}`]);
              this.lockItem(id);
          } else {
            this.openSnackBar();
          }
      });
  }

  readCustomerEditPage(id: any): void{
    localStorage.setItem('readPage', 'true');
    this.router.navigate([`/admin-home-page/customer/edit-customer/${id}`]);
  }

  lockItem(id: any): void {
    this.lockedItem.itemId = id;
    this.lockService.postLockItem(this.lockedItem).subscribe();
  }

  openSnackBar(): void {
    this.snackBar.open('Customer is currently being modified! Try again later.', 'Close', {
      duration: 4000,
      panelClass: ['snackbar']
    });
  }
}
