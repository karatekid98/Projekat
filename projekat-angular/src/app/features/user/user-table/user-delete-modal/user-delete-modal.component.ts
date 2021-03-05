import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../../../../core/services/user-service/user.service';

@Component({
  selector: 'app-user-delete-modal',
  templateUrl: './user-delete-modal.component.html',
  styleUrls: ['./user-delete-modal.component.scss']
})
export class UserDeleteModalComponent implements OnInit {

  public id: any;
   constructor(private router: Router, private userService: UserService,
    private dialogRef: MatDialogRef<UserDeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
  }
  deleteUser(id: any): void{
    this.userService.deleteUser(id).subscribe();
    this.dialogRef.close();
  }
}
