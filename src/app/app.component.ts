import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { LoadingService } from './shared/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  @ViewChild('footer', { read: ElementRef, static: false }) footer!: ElementRef;
  title = 'aika-angular';
  loading$ = this.loader.loading$;
  minHeight: number = 0;
  constructor(public loader: LoadingService) {
    this.minHeight = window.outerHeight;
    console.log(this.minHeight);
  }
}
