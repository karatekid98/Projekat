import { AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { AddressComponent } from '../address/address.component';
import { TemplateRef } from '@angular/core';
import { CustomerComponent } from '../customer/customer.component';
import { UserComponent } from '../user/user.component';
import { InvoiceComponent } from '../invoice/invoice.component';
import { ProductComponent } from '../product/product.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { TranslationService } from '../../core/services/translation/translation.service';

@Component({
  selector: 'app-admin-home-page',
  templateUrl: './admin-home-page.component.html',
  styleUrls: ['./admin-home-page.component.scss'],
})
export class AdminHomePageComponent implements OnInit {
  @ViewChild('viewContainer', { read: ViewContainerRef }) viewContainer: ViewContainerRef;
  selectedLang = true;
  row = '';
  selectedRow = 'Admin';
  showFiller = false;
  status = false;

  constructor(private router: Router, private resolver: ComponentFactoryResolver,
              private translate: TranslationService) {
              }

  ngOnInit(): void {
  }

  logOut(): void {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login-page']);
  }

  switchLanguage(language: string): void {
    this.translate.switchLanguage(language);
  }
}
