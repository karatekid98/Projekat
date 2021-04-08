import { Component, OnInit, AfterViewInit, ViewContainerRef, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserTableComponent } from './user-table/user-table.component';
import { UserAddComponent } from './user-table/user-add/user-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, AfterViewInit {
  @ViewChild('viewContainer', { read: ViewContainerRef }) viewContainer: ViewContainerRef;

  constructor(private route: ActivatedRoute, private router: Router, private resolver: ComponentFactoryResolver) { }

  // TODO: fix complete routing in app
  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    // setTimeout(() => {
    //   this.initializeComponent();
    // }, 0);

  }
  initializeComponent(): void {
    this.viewContainer.clear();
    if (this.router.url === '/admin-home-page/user') {
      const componentFactory = this.resolver.resolveComponentFactory(UserTableComponent);
      this.viewContainer.createComponent(componentFactory);
    } else if (this.router.url === '/admin-home-page/add-user') {
      const componentFactory = this.resolver.resolveComponentFactory(UserAddComponent);
      this.viewContainer.createComponent(componentFactory);
    } else {
      const componentFactory = this.resolver.resolveComponentFactory(UserEditComponent);
      this.viewContainer.createComponent(componentFactory);
    }
  }
}
