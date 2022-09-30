import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Magazine } from 'src/app/shared/interfaces/magazine';
import { ArticlesvcService } from 'src/app/shared/services/articlesvc.service';

@Component({
  selector: 'app-magazines',
  templateUrl: './magazines.component.html',
})
export class MagazinesComponent implements OnInit {
  selectedMagazine?: Magazine;
  magazineList: Magazine[] = [];
  constructor(private router: Router, private articleSvc: ArticlesvcService) {}

  ngOnInit(): void {
    this.getAllMagazines();
    console.log(this.magazineList);
  }

  getAllMagazines(): void {
    this.articleSvc.getMagazines().subscribe(magazines => {
      this.magazineList = magazines;
    });
  }

  onSelect(magazine: Magazine) {
    this.router.navigateByUrl(`/magazine?g=${magazine.key}`, {
      state: { magazine },
    });
  }
}
