import { Component, ComponentFactoryResolver, OnInit, ViewContainerRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../../core/services/user-service/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { UserDeleteModalComponent } from './user-delete-modal/user-delete-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { UserAddComponent } from './user-add/user-add.component';
import { Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { LockItem } from '../../../models/lockItem';
import { LockService } from '../../../core/services/lock-service/lock.service';
import { AdminHomePageComponent } from '../../admin-home-page/admin-home-page.component';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {

  @ViewChild('viewContainer', { read: ViewContainerRef }) viewContainer: ViewContainerRef;
  @Output() selectedTabChange: EventEmitter<MatTabChangeEvent>;
  displayedColumns: string[] = ['id', 'lastName', 'firstName',
   'address', 'email', 'phone', 'role', 'dateOfBirth', 'gender',
    'delete', 'read', 'edit'];

  tableOpened: boolean = true;
  userId: any;
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
  DynamicComponent = UserAddComponent;

  constructor(private router: Router, private userService: UserService, private parent: AdminHomePageComponent,
              public dialog: MatDialog, private resolver: ComponentFactoryResolver, private lockService: LockService) { }

  ngOnInit(): void {
    this.lockedItem.userId = localStorage.getItem('userId');
    const lockedItem = localStorage.getItem('lockedItem');
    if (lockedItem !== null) {
      this.lockedItem.itemId = lockedItem;
    }

    this.showUsers(this.parametars);
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    if (tabChangeEvent.index === 0) {
      this.showUsers(this.parametars);
    } else {
      this.showDeletedUsers(this.parametars);
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private showUsers(parametars: any): void{
    this.userService.getUsers(this.parametars).subscribe((users) => {
      const metadata = users['metadata'];
      this.pageSize = metadata.pageSize;
      this.currentPage = metadata.currentPage;
      this.currentPage = this.currentPage - 1;
      this.totalSizeOfItems = metadata.totalCount;
      const listOfUsers = users['pagedList'];
      this.dataSource = new MatTableDataSource(listOfUsers);
    });
  }

  private showDeletedUsers(parametars: any): void {
    this.userService.getDeletedUsers(this.parametars).subscribe((users) => {
      const metadata = users['metadata'];
      this.pageSize = metadata.pageSize;
      this.currentPage = metadata.currentPage;
      this.currentPage = this.currentPage - 1;
      this.totalSizeOfItems = metadata.totalCount;
      const listOfUsers = users['pagedList'];
      this.dataSource = new MatTableDataSource(listOfUsers);
    });
  }

  openDeleteModal(id: any): void{
    const dialogRef = this.dialog.open(UserDeleteModalComponent, {data: {id : id}});
    dialogRef.afterClosed().subscribe(x => {
      this.showUsers(this.parametars);
    });
   }

  //  openAddUser(event: any): void {
  //   this.tableOpened = false;
  //   this.viewContainer.clear();
  //   const componentFactory = this.resolver.resolveComponentFactory(UserAddComponent);
  //   this.viewContainer.createComponent(componentFactory);
  //  }

  handlePage(event: any): void {
    this.parametars.pageSize = event.pageSize;
    this.parametars.pageNumber = event.pageIndex + 1;
    this.showUsers(this.parametars);
  }

  openUserEditPage(id: any, component): void{

    this.assignComponent(component);
    this.router.navigate([`/admin-home-page/user/edit-user/${id}`]);
    // this.lockService.getIsItemLocked(id).subscribe((result) => {

    //     if (result === false) {
    //           this.router.navigate([`/admin-home-page/user/edit-user/${id}`]);
    //           this.lockItem(id);
    //       }
    //   });
  }

  lockItem(id: any): void {
    this.lockedItem.itemId = id;
    localStorage.setItem('lockedItem', id);
    this.lockService.postLockItem(this.lockedItem).subscribe();
  }


    assignComponent(component): any {
      this.parent.assignComponent(component);
    // if (component === 'user-add') {
    //   this.DynamicComponent = UserAddComponent;
    // } else {
    //  // this.DynamicComponent = AddressComponent;
    // }
  }
}
