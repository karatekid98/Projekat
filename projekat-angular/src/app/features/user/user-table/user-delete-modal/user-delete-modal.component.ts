import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../../../../core/services/user-service/user.service';
import { AddressService } from '../../../../core/services/address-service/address.service';
@Component({
  selector: 'app-user-delete-modal',
  templateUrl: './user-delete-modal.component.html',
  styleUrls: ['./user-delete-modal.component.scss']
})
export class UserDeleteModalComponent implements OnInit {
  component = '';
  public id: any;
   constructor(private router: Router, private userService: UserService, private addressService: AddressService,
               private dialogRef: MatDialogRef<UserDeleteModalComponent>,
               @Inject(MAT_DIALOG_DATA) public data) { }


  ngOnInit(): void {
  }

  softDelete(id: any): void{
    console.log(this.data.component);

    if (this.data.component === 'user') {
      this.userService.softDeleteUser(id).subscribe();
    } else if (this.data.component === 'address') {
      this.addressService.softDeleteAddress(id).subscribe();
    }
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}


