import { Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/core/services/user-service/user.service';

@Component({
  selector: 'app-user-edit-modal',
  templateUrl: './user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.scss']
})
export class UserEditModalComponent implements OnInit {

  public id: any;
   constructor(private router: Router, private userService: UserService,
    private dialogRef: MatDialogRef<UserEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
  }

  proceed(): void{
    //this.userService.softDeleteUser(id).subscribe();

    this.dialogRef.close();
    this.router.navigate([`/admin-home-page/user`]);
  }
  cancel(): void {
    this.dialogRef.close();
  }
}
