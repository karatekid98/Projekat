import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-admin-home-page',
  templateUrl: './admin-home-page.component.html',
  styleUrls: ['./admin-home-page.component.scss'],
})
export class AdminHomePageComponent implements OnInit {

  showFiller = false;
  constructor() {}

  ngOnInit(): void {
  }
}
