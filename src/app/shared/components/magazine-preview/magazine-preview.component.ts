import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Magazine } from '../../interfaces/magazine';

@Component({
  selector: 'magazine-preview',
  templateUrl: './magazine-preview.component.html',
})
export class MagazinePreviewComponent implements OnInit {
  @Input() magazine!: Magazine;
  @Output() selectedMagazine = new EventEmitter<Magazine>();

  constructor(public router: Router) {}

  ngOnInit(): void {}

  onSelectMagazine(magazine: Magazine) {
    this.selectedMagazine.emit(magazine);
  }
}
