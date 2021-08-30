import { Component, ComponentFactoryResolver, EventEmitter, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  defColToDisplay: string[];
  tabActive = '';
  lockedItems: Array<object> = [];
  editIndicator = false;
  tableOpened = true;
  userId;
  user;
  listOfLockedAddresses = [];
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
              public dialog: MatDialog, private lockService: LockService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.tabActive = 'users';
    this.user = JSON.parse(localStorage.getItem('userObject'));
    this.lockedItem.userId = this.user.id;
    this.editIndicator = true;
    this.showAddresses(this.parametars);
    this.defColToDisplay = this.displayedColumns;
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    if (tabChangeEvent.index === 0) {
      this.tabActive = 'addresses';
      this.showAddresses(this.parametars);
      this.displayedColumns = this.defColToDisplay;
    } else {
      this.tabActive = 'deletedaddresses';
      this.displayedColumns = this.displayedColumns.slice(0, 5);
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
      const listOfAddresses = addresses['pagedList'];
      this.getLockedAddresses(listOfAddresses);
      this.dataSource = new MatTableDataSource(listOfAddresses);
    });
  }
  private showDeletedAddresses(parametars: any): void {
    this.addresService.getDeletedAddresses(this.parametars).subscribe((addresses) => {
      const metadata = addresses['metadata'];
      this.pageSize = metadata.pageSize;
      this.currentPage = metadata.currentPage;
      this.currentPage = this.currentPage - 1;
      this.totalSizeOfItems = metadata.totalCount;
      const listOfAddresses = addresses['pagedList'];
      this.dataSource = new MatTableDataSource(listOfAddresses);
    });
  }


  getLockedAddresses(allAddresses: any): void {
    allAddresses.forEach(address => {
      this.lockService.getIsItemLocked(address.id).subscribe((res) => {
        if (res) {
          this.listOfLockedAddresses.push(address.id);
        }
      });
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
    if (this.tabActive === 'addresses') {
      this.showAddresses(this.parametars);
    } else {
      this.showDeletedAddresses(this.parametars);
    }
  }

  openAddressEditPage(id: any): void{
      this.lockService.getIsItemLocked(id).subscribe((result) => {
        if (result === false) {
              this.router.navigate([`/admin-home-page/address/edit-address/${id}`]);
              this.lockItem(id);
          }else {
            this.openSnackBar();
          }
      });
  }

  readAddressEditPage(id: any): void{
    localStorage.setItem('readPage', 'true');
    this.router.navigate([`/admin-home-page/address/edit-address/${id}`]);
  }

  lockItem(id: any): void {
    this.lockedItem.itemId = id;
    this.lockService.postLockItem(this.lockedItem).subscribe();
  }

  openSnackBar(): void {
    this.snackBar.open('Address is currently being modified! Try again later.', 'Close', {
      duration: 4000,
      panelClass: ['snackbar']
    });
  }

}
