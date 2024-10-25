import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  favoriteMessage: string = '';
  ngOnInit() {
    if (window.localStorage.getItem('liked') === 'true') {
      this.favoriteMessage = "Merci d'avoir aimé nos produits!";
    }
  }

  save() {
    localStorage.setItem('liked', 'true');
    this.favoriteMessage = "Merci d'avoir aimé nos produits!";
  }
}
