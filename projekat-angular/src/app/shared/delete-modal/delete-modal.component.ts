import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user-service/user.service';
import { AddressService } from '../../core/services/address-service/address.service';
@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {
  component = '';
  public id: any;
   constructor(private router: Router, private userService: UserService, private addressService: AddressService,
               private dialogRef: MatDialogRef<DeleteModalComponent>,
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


