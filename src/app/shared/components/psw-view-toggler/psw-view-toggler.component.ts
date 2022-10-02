import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'psw-view-toggler',
  templateUrl: './psw-view-toggler.component.html',
})
export class PswViewTogglerComponent implements OnInit {
  @Input() show!: boolean;
  @Output() showPsw = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}

  fnShowPsw() {
    this.showPsw.emit(this.show);
  }
}
