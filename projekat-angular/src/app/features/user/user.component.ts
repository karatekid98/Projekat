import { Component, OnInit, AfterViewInit, ViewContainerRef, ViewChild, ComponentFactoryResolver, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserTableComponent } from './user-table/user-table.component';
import { UserAddComponent } from './user-table/user-add/user-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { AdminHomePageComponent } from '../admin-home-page/admin-home-page.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, AfterViewInit {

  constructor(@Inject(AdminHomePageComponent) private parent: AdminHomePageComponent, private route: ActivatedRoute,
              private router: Router, private resolver: ComponentFactoryResolver) { }

  // TODO: fix complete routing in app
  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initializeComponent();
    }, 0);

  }



  initializeComponent(): void {
    this.parent.viewContainer.clear();
    if (this.router.url === '/admin-home-page/user') {
      const componentFactory = this.resolver.resolveComponentFactory(UserAddComponent);
      this.parent.viewContainer.createComponent(componentFactory);
    } else if (this.router.url === '/admin-home-page/add-user') {
      const componentFactory = this.resolver.resolveComponentFactory(UserAddComponent);
      this.parent.viewContainer.createComponent(componentFactory);
    } else {
      const componentFactory = this.resolver.resolveComponentFactory(UserEditComponent);
      this.parent.viewContainer.createComponent(componentFactory);
    }
  }

}
