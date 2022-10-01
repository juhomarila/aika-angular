import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FooterComponent } from './components/menu/footer/footer.component';
import { LoadingService } from './shared/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit {
  @ViewChild('footer') footer!: ElementRef;
  @ViewChild('header') header!: ElementRef;
  title = 'aika-angular';
  loading$ = this.loader.loading$;
  minHeight: number = 0;
  constructor(public loader: LoadingService, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    if (this.footer) {
      this.minHeight =
        window.innerHeight -
        this.footer.nativeElement.getBoundingClientRect().height -
        this.header.nativeElement.getBoundingClientRect().height;
    }
    this.cdr.detectChanges();
  }
}
