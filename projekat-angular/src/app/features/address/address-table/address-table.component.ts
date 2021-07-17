import { Component, ComponentFactoryResolver, EventEmitter, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/core/services/address-service/address.service';
import { LockService } from 'src/app/core/services/lock-service/lock.service';
import { LockItem } from 'src/app/models/lockItem';
import { DeleteModalComponent } from '../../../shared/delete-modal/delete-modal.component';

@Component({
  selector: 'app-address-table',
  templateUrl: './address-table.component.html',
  styleUrls: ['./address-table.component.scss', '../../user/user-table/user-table.component.scss']
})
export class AddressTableComponent implements OnInit {

  @ViewChild('viewContainer', { read: ViewContainerRef }) viewContainer: ViewContainerRef;
  @Output() selectedTabChange: EventEmitter<MatTabChangeEvent>;
  displayedColumns: string[] = ['id', 'city', 'line',  'country',
    'postcode', 'delete', 'read', 'edit'];

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

  constructor(private router: Router, private addresService: AddressService,
              public dialog: MatDialog, private lockService: LockService) { }

  ngOnInit(): void {

    this.lockedItem.userId = localStorage.getItem('userId');
    const lockedItem = localStorage.getItem('lockedItem');
    if (lockedItem !== null) {
      this.editIndicator = true;
      this.lockedItem.itemId = lockedItem;
    }

    this.showAddresses(this.parametars);
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    if (tabChangeEvent.index === 0) {
      this.showAddresses(this.parametars);
    } else {
      this.showDeletedAddresses(this.parametars);
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private showAddresses(parametars: any): void{
    this.addresService.getAddresses(this.parametars).subscribe((addresses) => {
      const metadata = addresses['metadata'];
      this.pageSize = metadata.pageSize;
      this.currentPage = metadata.currentPage;
      this.currentPage = this.currentPage - 1;
      this.totalSizeOfItems = metadata.totalCount;
      const listOfUsers = addresses['pagedList'];
      this.dataSource = new MatTableDataSource(listOfUsers);
    });
  }
  private showDeletedAddresses(parametars: any): void {
    this.addresService.getDeletedAddresses(this.parametars).subscribe((addresses) => {
      const metadata = addresses['metadata'];
      this.pageSize = metadata.pageSize;
      this.currentPage = metadata.currentPage;
      this.currentPage = this.currentPage - 1;
      this.totalSizeOfItems = metadata.totalCount;
      const listOfUsers = addresses['pagedList'];
      this.dataSource = new MatTableDataSource(listOfUsers);
    });
  }

  openDeleteModal(id: any): void{
    const dialogRef = this.dialog.open(DeleteModalComponent, {data: {id : id, component: 'address'}});
    dialogRef.afterClosed().subscribe(x => {
      this.showAddresses(this.parametars);
    });
   }


  handlePage(event: any): void {
    this.parametars.pageSize = event.pageSize;
    this.parametars.pageNumber = event.pageIndex + 1;
    this.showAddresses(this.parametars);
  }

  openAddressEditPage(id: any): void{
      this.lockService.getIsItemLocked(id).subscribe((result) => {
        if (result === false) {
              this.router.navigate([`/admin-home-page/address/edit-address/${id}`]);
              this.lockItem(id);
          }
      });
  }

  readAddressEditPage(id: any): void{
    this.router.navigate([`/admin-home-page/address/edit-address/${id}`]);
  }

  lockItem(id: any): void {
    this.lockedItem.itemId = id;
    localStorage.setItem('lockedItem', id);
    this.lockedItems.push(this.lockedItem.itemId);
    this.lockService.postLockItem(this.lockedItem).subscribe();
  }

}
