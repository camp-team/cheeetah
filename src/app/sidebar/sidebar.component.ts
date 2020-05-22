import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
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
