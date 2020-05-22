import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user$ = this.authService.user$;

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login();
  }

  logout(uid: string) {
    this.authService.logout(uid);
  }

  ngOnInit(): void {}
}
