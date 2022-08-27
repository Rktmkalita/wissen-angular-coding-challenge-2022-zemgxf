import { Component, HostListener, VERSION } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;

  userActivity: any;
  userInactive: Subject<any> = new Subject();
  constructor(private authenticationService: AuthenticationService) {
    this.setTimeout();
    this.userInactive.subscribe(() => {
    this.logout();
    }); 
  }

  logout() {
    this.authenticationService.logout();
  }
  
  setTimeout() {
    this.userActivity = setTimeout(() => {
      if (this.authenticationService.isLoggedIn) {
        this.userInactive.next(undefined);
        console.log('logged out');
      }
    }, 300*1000);
  }

  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }

}
