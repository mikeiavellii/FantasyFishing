import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;

  constructor(private authService: SocialAuthService) { }

  
signInWithGoogle(): void {
	this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
	this.authService.signOut();
  }    


  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  user: SocialUser = {} as SocialUser;

  ngOnInit(): void {

    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(user);
      this.loggedIn = (user != null);
      
    });
  }
    loggedIn: boolean = false;

}
