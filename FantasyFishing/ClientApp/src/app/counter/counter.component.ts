import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';

@Component({
  selector: 'app-counter-component',
  templateUrl: './counter.component.html'
})
export class CounterComponent {
  public currentCount = 0;

  public incrementCounter() {
    this.currentCount++;
  }

  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;
constructor(private authService: SocialAuthService) { }

ngOnInit(): void {

	this.authService.authState.subscribe((user) => {
  	this.user = user;
    console.log(user);
  	this.loggedIn = (user != null);
	});
}

}
