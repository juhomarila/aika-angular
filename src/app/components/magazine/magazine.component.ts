import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Journalist } from 'src/app/shared/interfaces/journalist';
import { Magazine } from 'src/app/shared/interfaces/magazine';
import { FirestoreService } from 'src/app/shared/services/firestore.service';

@Component({
  selector: 'app-magazine',
  templateUrl: './magazine.component.html',
})
export class MagazineComponent implements OnInit {
  magazineKey!: string;
  magazine!: Magazine;
  height: number = 0;
  journalists: Journalist[] = [];
  selectedJournalist!: Journalist;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fireStoreSvc: FirestoreService
  ) {
    this.height = window.innerHeight * 0.85;
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.forEach(param => {
      this.magazineKey = param['g'];
    });
    this.fireStoreSvc.getMagazine(this.magazineKey).subscribe(magazine => {
      this.magazine = magazine.data() as Magazine;
      this.magazine.journalists.map(jounalist => {
        this.fireStoreSvc.getJournalist(jounalist).subscribe(data => {
          this.journalists.push(data.data() as Journalist);
        });
      });
    });
  }

  getJournalist(key: string): string {
    let journalistName = '';
    this.journalists.map(journalist => {
      if (journalist.key === key) {
        journalistName = journalist.name;
      }
    });
    return journalistName;
  }

  goToJournalistPage(key: string) {
    this.journalists.map(journalist => {
      if (journalist.key === key) {
        this.router.navigateByUrl(`/journalist?g=${journalist.key}`, {
          state: { journalist },
        });
      }
    });
  }
}
