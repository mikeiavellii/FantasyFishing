import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, HostListener, ViewChild } from '@angular/core';
import { UserService } from '../Services/user.service';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;
constructor(private authService: SocialAuthService, private userService: UserService) { }
//User


//Sign In
signInWithGoogle(): void {
  this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
}

ngOnInit(): void {

	this.authService.authState.subscribe((user) => {
  	this.user = user;
    console.log(user);
  	this.loggedIn = (user != null);
    
	});
}
//Booleans
hidePreLogin: boolean = false;
newUser: boolean = false;

getTutorialMode():void{
  this.hidePreLogin = true;
  this.newUser = true;
}



// //Custom Cursor
//   @ViewChild('cursor') refCursor: any;
//   @HostListener('document:mousemove',['$event'])
//   onMouseMove(event:any){
//     this.refCursor.nativeElement.style.left = (event.pageX - 25) + "px";
//     this.refCursor.nativeElement.style.top = (event.pageY -25) + "px";
//   }

//Determine position
// @ViewChild('cursor') refCursor: any;
// @HostListener('document:click',['$event'])
// onClick(event:any){
//   console.log(event.pageX);
//   console.log(event.pageY);

// }

}

