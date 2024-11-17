import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  UserName:string | null;

  ngOnInit() {
    this.UserName = sessionStorage.getItem('User')
  }

}
