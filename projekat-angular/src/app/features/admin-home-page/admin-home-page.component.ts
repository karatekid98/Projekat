import { AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, RouterLinkWithHref } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { AddressComponent } from '../address/address.component';
import { TemplateRef } from '@angular/core';
@Component({
  selector: 'app-admin-home-page',
  templateUrl: './admin-home-page.component.html',
  styleUrls: ['./admin-home-page.component.scss'],
})
export class AdminHomePageComponent implements OnInit, AfterViewInit {
  @ViewChild('panel', { static: true }) private panel: MatSidenav;
  @ViewChild('viewContainer', { read: ViewContainerRef }) viewContainer: ViewContainerRef;
  @ViewChild('isLoggedInTemplate', { read: TemplateRef }) template: TemplateRef<any>;
  clicked = false;
  row = '';
  showFiller = false;


  constructor(private router: Router, private resolver: ComponentFactoryResolver) {}

  ngOnInit(): void {


  }
  ngAfterViewInit(): void {

    const componentFactory = this.resolver.resolveComponentFactory(AddressComponent);
    this.viewContainer.createComponent(componentFactory);
  }

  open(event): void {
    if (event.target.id === '') {
      this.getClickedRow(event.target.parentElement.id);
    } else {
      this.getClickedRow(event.target.id);
    }

    this.clicked = true;

    this.router.navigate([`/${this.row}`]);
  }

  getClickedRow(id: string): string {
    this.row = id.substr(0, id.indexOf('-'));
    return this.row;
  }
}
