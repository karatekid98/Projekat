import { Component, EventEmitter, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { LockService } from 'src/app/core/services/lock-service/lock.service';
import { LockItem } from 'src/app/models/lockItem';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';
import { ProductService } from '../../../core/services/product-service/product.service';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss', '../../user/user-table/user-table.component.scss']
})
export class ProductTableComponent implements OnInit {

  @ViewChild('viewContainer', { read: ViewContainerRef }) viewContainer: ViewContainerRef;
  @Output() selectedTabChange: EventEmitter<MatTabChangeEvent>;
  displayedColumns: string[] = ['id', 'name', 'unit',  'price',
    'dateAdded', 'availableQuantity', 'delete', 'read', 'edit'];

  lockedItems: Array<object> = [];
  editIndicator = false;
  tableOpened = true;
  userId;
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

  constructor(private router: Router, private productService: ProductService,
              public dialog: MatDialog, private lockService: LockService) { }

  ngOnInit(): void {

    this.lockedItem.userId = localStorage.getItem('userId');
    const lockedItem = localStorage.getItem('lockedItem');
    if (lockedItem !== null) {
      this.editIndicator = true;
      this.lockedItem.itemId = lockedItem;
    }

    this.showProducts(this.parametars);
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    if (tabChangeEvent.index === 0) {
      this.showProducts(this.parametars);
    } else {
      this.showDeletedProducts(this.parametars);
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private showProducts(parametars: any): void{
    this.productService.getProducts(this.parametars).subscribe((products) => {
      const metadata = products['metadata'];
      this.pageSize = metadata.pageSize;
      this.currentPage = metadata.currentPage;
      this.currentPage = this.currentPage - 1;
      this.totalSizeOfItems = metadata.totalCount;
      const listOfUsers = products['pagedList'];
      this.dataSource = new MatTableDataSource(listOfUsers);
    });
  }
  private showDeletedProducts(parametars: any): void {
    this.productService.getDeletedProducts(this.parametars).subscribe((products) => {
      const metadata = products['metadata'];
      this.pageSize = metadata.pageSize;
      this.currentPage = metadata.currentPage;
      this.currentPage = this.currentPage - 1;
      this.totalSizeOfItems = metadata.totalCount;
      const listOfUsers = products['pagedList'];
      this.dataSource = new MatTableDataSource(listOfUsers);
    });
  }

  openDeleteModal(id: any): void{
    const dialogRef = this.dialog.open(DeleteModalComponent, {data: {id : id, component: 'address'}});
    dialogRef.afterClosed().subscribe(x => {
      this.showProducts(this.parametars);
    });
   }


  handlePage(event: any): void {
    this.parametars.pageSize = event.pageSize;
    this.parametars.pageNumber = event.pageIndex + 1;
    this.showProducts(this.parametars);
  }

  openProductEditPage(id: any): void{
      this.lockService.getIsItemLocked(id).subscribe((result) => {
        if (result === false) {
              this.router.navigate([`/admin-home-page/product/edit-product/${id}`]);
              this.lockItem(id);
          }
      });
  }

  readProductEditPage(id: any): void{
    this.router.navigate([`/admin-home-page/product/edit-product/${id}`]);
  }

  lockItem(id: any): void {
    this.lockedItem.itemId = id;
    localStorage.setItem('lockedItem', id);
    this.lockedItems.push(this.lockedItem.itemId);
    this.lockService.postLockItem(this.lockedItem).subscribe();
  }


}
