import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Journalist } from 'src/app/shared/interfaces/journalist';
import { Magazine } from 'src/app/shared/interfaces/magazine';
import { FirestoreService } from 'src/app/shared/services/firestore.service';

@Component({
  selector: 'app-journalist',
  templateUrl: './journalist.component.html',
})
export class JournalistComponent implements OnInit, OnDestroy {
  journalist!: Journalist;
  height: number = 0;
  width: number = 0;
  magazines: Magazine[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private fireStoreSvc: FirestoreService
  ) {
    this.height = window.innerHeight * 0.75;
    this.width = window.innerWidth * 0.4;
  }

  ngOnInit(): void {
    if (history.state['journalist']) {
      this.journalist = history.state['journalist'];
      localStorage.setItem('journalist', JSON.stringify(this.journalist));
    } else {
      if (localStorage.getItem('journalist')) {
        this.journalist = JSON.parse(localStorage.getItem('journalist')!);
      }
      if (!localStorage.getItem('journalist')) {
        this.activatedRoute.queryParams.forEach(param => {
          this.fireStoreSvc.getJournalist(param['g']).subscribe(journalist => {
            this.journalist = journalist.data() as Journalist;
          });
        });
      }
    }
  }

  //todo fetch magazines and get their names

  ngOnDestroy(): void {
    localStorage.removeItem('journalist');
  }
}
