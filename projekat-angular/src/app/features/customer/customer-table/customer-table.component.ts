import { Component, ComponentFactoryResolver, EventEmitter, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

  lockedItems: Array<object> = [];
  editIndicator = false;
  tableOpened = true;
  customerId;
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

  constructor(private router: Router, private customerService: CustomerService,
              public dialog: MatDialog, private resolver: ComponentFactoryResolver, private lockService: LockService) { }

  ngOnInit(): void {

    this.lockedItem.userId = localStorage.getItem('userId');
    const lockedItem = localStorage.getItem('lockedItem');
    if (lockedItem !== null) {
      this.editIndicator = true;
      this.lockedItem.itemId = lockedItem;
    }

    this.showCustomers(this.parametars);
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    if (tabChangeEvent.index === 0) {
      this.showCustomers(this.parametars);
    } else {
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

  openDeleteModal(id: any): void{
    const dialogRef = this.dialog.open(DeleteModalComponent, {data: {id : id, component: 'customer'}});
    dialogRef.afterClosed().subscribe(x => {
      this.showCustomers(this.parametars);
    });
   }

  handlePage(event: any): void {
    this.parametars.pageSize = event.pageSize;
    this.parametars.pageNumber = event.pageIndex + 1;
    this.showCustomers(this.parametars);
  }

  openCustomerEditPage(id: any): void{
      this.lockService.getIsItemLocked(id).subscribe((result) => {
        if (result === false) {
              this.router.navigate([`/admin-home-page/customer/edit-customer/${id}`]);
              this.lockItem(id);
          }
      });
  }

  readCustomerEditPage(id: any): void{
    this.router.navigate([`/admin-home-page/customer/edit-customer/${id}`]);
  }

  lockItem(id: any): void {
    this.lockedItem.itemId = id;
    localStorage.setItem('lockedItem', id);
    this.lockedItems.push(this.lockedItem.itemId);
    this.lockService.postLockItem(this.lockedItem).subscribe();
  }
}
