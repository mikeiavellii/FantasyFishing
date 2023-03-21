import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

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
  @ViewChild('cursor') refCursor: any;
  @HostListener('document:mousemove',['$event'])
  onMouseMove(event:any){
    this.refCursor.nativeElement.style.left = (event.pageX - 25) + "px";
    this.refCursor.nativeElement.style.top = (event.pageY -25) + "px";
  }


}
