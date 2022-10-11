import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'footerMenu',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {
  year: number = 0;
  constructor() {}

  ngOnInit(): void {
    this.year = new Date().getFullYear();
  }
}
