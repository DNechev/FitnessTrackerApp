import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output()sideNavToggle = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  onToggle() {
    this.sideNavToggle.emit();
  }
}
