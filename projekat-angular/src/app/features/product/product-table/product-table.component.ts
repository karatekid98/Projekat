import { Component, EventEmitter, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  defColToDisplay: string[];
  tabActive = '';
  lockedItems: Array<object> = [];
  editIndicator = false;
  tableOpened = true;
  userId;
  lockedItem: LockItem = {
    itemId: '',
    userId: ''
  };
  user;
  listOfLockedProducts = [];
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
              public dialog: MatDialog, private lockService: LockService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    // this.lockedItem.userId = localStorage.getItem('userId');
    // const lockedItem = localStorage.getItem('lockedItem');
    // if (lockedItem !== null) {
    //   this.editIndicator = true;
    //   this.lockedItem.itemId = lockedItem;
    // }
    this.user = JSON.parse(localStorage.getItem('userObject'));
    this.lockedItem.userId = this.user.id;
    this.editIndicator = true;
    this.showProducts(this.parametars);
    this.defColToDisplay = this.displayedColumns;
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    if (tabChangeEvent.index === 0) {
      this.tabActive = 'products';
      this.showProducts(this.parametars);
      this.displayedColumns = this.defColToDisplay;
    } else {
      this.tabActive = 'deletedproducts';
      this.displayedColumns = this.displayedColumns.slice(0, 6);
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
      const listOfProducts = products['pagedList'];
      this.getLockedProducts(listOfProducts);
      this.dataSource = new MatTableDataSource(listOfProducts);
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


  getLockedProducts(allProducts: any): void {
    allProducts.forEach(product => {
      this.lockService.getIsItemLocked(product.id).subscribe((res) => {
        if (res) {
          this.listOfLockedProducts.push(product.id);
        }
      });
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
    if (this.tabActive === 'products') {
      this.showProducts(this.parametars);
    } else {
      this.showDeletedProducts(this.parametars);
    }
  }

  openProductEditPage(id: any): void{
      this.lockService.getIsItemLocked(id).subscribe((result) => {
        if (result === false) {
              this.router.navigate([`/admin-home-page/product/edit-product/${id}`]);
              this.lockItem(id);
          }  else {
            this.openSnackBar();
          }
      });
  }

  readProductEditPage(id: any): void{
    localStorage.setItem('readPage', 'true');
    this.router.navigate([`/admin-home-page/product/edit-product/${id}`]);
  }

  lockItem(id: any): void {
    this.lockedItem.itemId = id;
    this.lockService.postLockItem(this.lockedItem).subscribe();
  }

  openSnackBar(): void {
    this.snackBar.open('Product is currently being modified! Try again later.', 'Close', {
      duration: 4000,
      panelClass: ['snackbar']
    });
  }


}
