import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../core/services/user-service/user.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'adress', 'email', 'delete'];
  users: User[];
  dataSource;

  parametars: any = {
    'pageNumber': 1,
    'pageSize': 5
  }

  constructor(private userService: UserService) { }

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
}
