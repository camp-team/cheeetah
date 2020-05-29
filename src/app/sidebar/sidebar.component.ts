import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, DoCheck {
  user$ = this.authService.user$;
  userLoginStatus: boolean;
  ownerLoginStatus: boolean;

  constructor(private authService: AuthService) {}

  login() {
    this.authService.loginUser();
  }

  loginOwner() {
    this.authService.loginOwner();
  }

  ngOnInit() {
    this.loginStatusCheck();
  }

  ngDoCheck() {
    this.loginStatusCheck();
  }

  loginStatusCheck() {
    const status = localStorage.getItem('Status');
    if (status === 'User') {
      this.userLoginStatus = true;
    } else if (status === 'Owner') {
      this.ownerLoginStatus = true;
    } else {
      this.userLoginStatus = false;
      this.ownerLoginStatus = false;
    }
  }

  logout(uid: string) {
    this.authService.logout(uid);
    localStorage.removeItem('Status');
    this.userLoginStatus = false;
    this.ownerLoginStatus = false;
  }
}
