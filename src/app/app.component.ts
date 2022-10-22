import { ViewportScroller } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router, Scroll } from '@angular/router';
import { delay, filter } from 'rxjs';
import { FavouriteService } from './shared/services/favourite.service';
import { LikeService } from './shared/services/like.service';
import { LoadingService } from './shared/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit, OnInit {
  @ViewChild('footer') footer!: ElementRef;
  @ViewChild('header') header!: ElementRef;
  title = 'aika-angular';
  loading$ = this.loader.loading$;
  minHeight: number = 0;
  constructor(
    public loader: LoadingService,
    private cdr: ChangeDetectorRef,
    router: Router,
    viewportScroller: ViewportScroller,
    private favouriteSvc: FavouriteService,
    private likeSvc: LikeService
  ) {
    router.events
      .pipe(filter((e): e is Scroll => e instanceof Scroll))
      .pipe(delay(1))
      .subscribe(e => {
        if (e.position) {
          viewportScroller.scrollToPosition(e.position);
        } else if (e.anchor) {
          viewportScroller.scrollToAnchor(e.anchor);
        } else {
          viewportScroller.scrollToPosition([0, 0]);
        }
      });
  }
  ngOnInit(): void {
    // for some reason services needs to be opened here
    //  or they wont fetch values on first frontpage render
    this.favouriteSvc.checkIfFavourite('');
    this.likeSvc.checkIfLiked('');
  }

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
