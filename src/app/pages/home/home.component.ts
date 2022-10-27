import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  userExists: boolean = true;
  constructor(private authService: AuthService) {}

  public logout() {
    this.authService.logOut();
  }
}
