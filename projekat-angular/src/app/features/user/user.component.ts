import { Component, OnInit, AfterViewInit, ComponentFactoryResolver, Inject } from '@angular/core';
import { Router } from '@angular/router';
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
  clicked = false;
  str: string;
  public text: string;

  constructor(@Inject(AdminHomePageComponent) private parent: AdminHomePageComponent,
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
    let comp = 'user';
    let component = 'UserTableComponent';
    if (this.router.url === `/admin-home-page/${comp}`) {
      const componentFactory = this.resolver.resolveComponentFactory(UserTableComponent);
      this.parent.viewContainer.createComponent(componentFactory);
    } else if (this.router.url === `/admin-home-page/${comp}/add-${comp}`) {
      const componentFactory = this.resolver.resolveComponentFactory(UserAddComponent);
      this.parent.viewContainer.createComponent(componentFactory);
    } else {
      if (window.location.href.indexOf(`/admin-home-page/${comp}/edit-${comp}`) > -1) {
        const componentFactory = this.resolver.resolveComponentFactory(UserEditComponent);
        this.parent.viewContainer.createComponent(componentFactory);
      }
    }
  }

}
