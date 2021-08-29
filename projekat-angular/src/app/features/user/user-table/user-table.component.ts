import { Component, ComponentFactoryResolver, OnInit, ViewContainerRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../../core/services/user-service/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteModalComponent } from '../../../shared/delete-modal/delete-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { LockItem } from '../../../models/lockItem';
import { LockService } from '../../../core/services/lock-service/lock.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {

  @ViewChild('viewContainer', { read: ViewContainerRef }) viewContainer: ViewContainerRef;
  @Output() selectedTabChange: EventEmitter<MatTabChangeEvent>;
  displayedColumns: string[] = ['id', 'address', 'firstName', 'lastName', 'gender',
    'email', 'phone', 'role', 'dateOfBirth',
    'delete', 'read', 'edit'];

  user;
  lockedItems: Array<object> = [];
  editIndicator = false;
  tableOpened = true;
  userId;
  listOfLockedUsers = [];
  lockedItem: LockItem = {
    itemId: '',
    userId: ''
  };
  loggedUser;
  showCol = true;
  dataSource;
  pageSize;
  totalSizeOfItems;
  currentPage;
  pageEvent;
  parametars: any = {
    pageNumber: 1,
    pageSize: 5
  };

  constructor(private router: Router, private userService: UserService,
              public dialog: MatDialog, private lockService: LockService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // this.loggedUser = JSON.parse(localStorage.getItem('userObject'));
    // if (this.loggedUser.role) {
    //   this.showCol = true;
    // }
    this.user = JSON.parse(localStorage.getItem('userObject'));
    this.lockedItem.userId = this.user.id;
    this.editIndicator = true;
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
      this.pageSize = metadata.pageSize
      this.currentPage = metadata.currentPage;
      this.currentPage = this.currentPage - 1;
      this.totalSizeOfItems = metadata.totalCount;
      const listOfUsers = users['pagedList'];
      this.getLockedUsers(listOfUsers);
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

  getLockedUsers(allUsers: any): void {
    allUsers.forEach(user => {
      this.lockService.getIsItemLocked(user.id).subscribe((res) => {
        if (res) {
          this.listOfLockedUsers.push(user.id);
        }
      });
    });
  }

  openDeleteModal(id: any): void{
    const dialogRef = this.dialog.open(DeleteModalComponent, {data: {id : id, component: 'user'}});
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

  openUserEditPage(id: any): void{
      this.lockService.getIsItemLocked(id).subscribe((result) => {
        if (result === false) {
              this.router.navigate([`/admin-home-page/user/edit-user/${id}`]);
              this.lockItem(id);
        } else {
          this.openSnackBar();
        }
      });
  }

  readUserEditPage(id: any): void{
    localStorage.setItem('readPage', 'true');
    this.router.navigate([`/admin-home-page/user/edit-user/${id}`]);
  }

  lockItem(id: any): void {
    this.lockedItem.itemId = id;
    //localStorage.setItem('lockedItem', id);
    // this.lockedItems.push(this.lockedItem.itemId);

    this.lockService.postLockItem(this.lockedItem).subscribe();
  }

  openSnackBar(): void {
    this.snackBar.open('User is currently being modified! Try again later.', 'Close', {
      duration: 4000,
      panelClass: ['snackbar']
    });
  }
}
