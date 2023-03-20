import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { CaughtFishComponent } from '../Components/caught-fish/caught-fish.component';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;

  constructor(private authService: SocialAuthService) { }

  the: boolean = false;

signInWithGoogle(): void {

	this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  the:true;
  }

  signOut(): void {
    setTimeout(()=>{
	this.authService.signOut();
  },5000);
  the:false;
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
``