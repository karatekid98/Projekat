import { Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-admin-home-page',
  templateUrl: './admin-home-page.component.html',
  styleUrls: ['./admin-home-page.component.scss']
})

export class AdminHomePageComponent implements OnInit {
  @Input() opened: boolean;
  @ViewChild('drawer') drawer: ElementRef;
  status = false;
  showFiller = false;
  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.opened = true;
  }

  resizeDrawer(event: any): void {
      this.renderer.addClass(event.target, 'sidenav-after');
      this.status = !this.status;
  }

}
