import { Component, OnInit, AfterViewInit, ComponentFactoryResolver, Inject} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserAddComponent } from './user-table/user-add/user-add.component';

import { AdminHomePageComponent } from '../admin-home-page/admin-home-page.component';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, AfterViewInit {

  clicked = false;
  str: string;
  private wasInside = false;
  public text: string;

  DynamicComponent = UserAddComponent;

  constructor(@Inject(AdminHomePageComponent) private parent: AdminHomePageComponent,
              private route: ActivatedRoute,
              private router: Router, private resolver: ComponentFactoryResolver) { }

  // TODO: fix complete routing in app
  ngOnInit(): void {

  }

  ngAfterViewInit(): void {


  }


  assignComponent(component): any {
    this.parent.assignComponent(component);
    // if (component === 'user/add-user') {
    //   this.DynamicComponent = UserAddComponent;
    // } else {

    // }
  }

}
