import { Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/core/services/user-service/user.service';
import { LockService } from '../../core/services/lock-service/lock.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {

  public id: any;
   constructor(private router: Router, private userService: UserService,
               private lockService: LockService,
               private dialogRef: MatDialogRef<EditModalComponent>,
               @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
  }

  proceed(): void{
    const lockedItemId = localStorage.getItem('lockedItem');
    if (lockedItemId !== null) {
      this.lockService.postUnlockItem(lockedItemId).subscribe();
    }
    localStorage.removeItem('lockedItem');
    this.router.navigate([`/admin-home-page/${this.data.component}`]);
    this.dialogRef.close();
  }
  cancel(): void {
    this.dialogRef.close();
  }
}
