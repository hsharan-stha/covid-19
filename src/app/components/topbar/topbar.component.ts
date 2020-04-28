import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  showMenu: boolean = false;
  @Output() menuClickEvent: EventEmitter<any> = new EventEmitter();


  constructor() {
  }

  ngOnInit(): void {
  }

  menuClicked() {
    this.showMenu = !this.showMenu;
    this.menuClickEvent.emit(this.showMenu);
  }

}
