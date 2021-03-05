import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../core/services/user-service/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { UserDeleteModalComponent } from './user-delete-modal/user-delete-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'lastName', 'firstName', 'address', 'email', 'phone', 'role', 'dateOfBirth', 'gender', 'delete', 'add', 'read', 'edit'];
  users: User[];
  // pagination
  pageSize;
  currentPage;
  totalSizeOfPages;
  pageEvent;
  headers: 'X-Pagination';
  //
  dataSource;

  parametars: any = {
    pageNumber: 1,
    pageSize: 5
  };

  constructor(private userService: UserService, public dialog: MatDialog) { }

  ngOnInit(): void {
   this.showUsers();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private showUsers(): void{
    this.userService.getUsers(this.parametars).subscribe((users) => {
      this.dataSource = new MatTableDataSource(users);
    });
  }

  openDeleteModal(id: any): void{
    console.log(id);
    let dialogRef= this.dialog.open(UserDeleteModalComponent, {data: {id : id}});
    dialogRef.afterClosed().subscribe(x => {
      this.showUsers();
    });
   }

  handlePage(event: any): void {
    console.log(event);
  }
}
