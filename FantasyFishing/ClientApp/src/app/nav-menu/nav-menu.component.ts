import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { CaughtFishComponent } from '../Components/caught-fish/caught-fish.component';
import { UserService } from '../Services/user.service';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;

  constructor(private authService: SocialAuthService, private userService: UserService) { }

  //Booleans
  // showInstructions: boolean = false;
  // hideInstructions: boolean = false;
  loggedIn: boolean = false;

  //User
  user: SocialUser = {} as SocialUser;

  //Sign In
  signInWithGoogle(): void {
	  this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  //Sign Out
  signOut(): void {
	  this.authService.signOut();
  }

  openSettings:boolean = false;

  displayRandom: boolean = false;
  displayReel: boolean = false;
  canCatchFish: boolean = false;
  tryAgain: boolean = false;
  casted: boolean = false;
  showInstructions: boolean = false;
  hideInstructions: boolean = false;
  hideBackground: boolean = false;
  catchTrash: boolean = false;
  hideMusicPlayer: boolean= false;


  getMusicPlayer(): void{
    this.showInstructions = false;
    this.openSettings = true;
    this.casted = true;
    this.tryAgain = false;
  }
  //Music Player
  audio: any = new Audio()
 playaudioSunBeam(){
    this.audio.src = "https://cdn.discordapp.com/attachments/1090352770135101453/1090371453922316410/SUNBEAM.mp3";
    this.audio.load();
    this.audio.play();
  }    
  playaudioBlueRock(){
    this.audio.src = "https://cdn.discordapp.com/attachments/1090352770135101453/1090352905439166465/blue_rock.mp3";
    this.audio.load();
    this.audio.play();
  }   
  playaudioSoCloudy(){
    this.audio.src = "https://cdn.discordapp.com/attachments/1090352770135101453/1090371393381736579/so_cloudy.mp3";
    this.audio.load();
    this.audio.play();
  } 
  playaudioSmoothMF(){
    this.audio.src = "https://cdn.discordapp.com/attachments/1090352770135101453/1090371393889251398/smooth_mf.mp3";
    this.audio.load();
    this.audio.play();
  } 
  playaudioScuffItUp(){
    this.audio.src = "https://cdn.discordapp.com/attachments/1090352770135101453/1090371394329641151/scuff_it_up.mp3";
    this.audio.load();
    this.audio.play();
  } 
  playaudioMeds(){
    this.audio.src = "https://cdn.discordapp.com/attachments/1090352770135101453/1090371394765860975/meds.mp3";
    this.audio.load();
    this.audio.play();
  } 
  playaudioFocus(){
    this.audio.src = "https://cdn.discordapp.com/attachments/1090352770135101453/1090371395206250676/focus.mp3";
    this.audio.load();
    this.audio.play();
  } 
  playaudioBounceIt(){
    this.audio.src = "https://cdn.discordapp.com/attachments/1090352770135101453/1090371395206250676/focus.mp3";
    this.audio.load();
    this.audio.play();
  } 
  playaudioStupidStar(){
    this.audio.src = "https://cdn.discordapp.com/attachments/1090352770135101453/1090371395965419560/stupid_star.mp3";
    this.audio.load();
    this.audio.play();
  } 
  playaudioSpacedOut(){
    this.audio.src = "https://cdn.discordapp.com/attachments/1090352770135101453/1090371396435189800/spaced_out.mp3";
    this.audio.load();
    this.audio.play();
  } 
  playaudioSweetLikeCandy(){
    this.audio.src = "https://cdn.discordapp.com/attachments/1090352770135101453/1090371453528064080/sweet_like_candy.mp3";
    this.audio.load();
    this.audio.play();
  } 
  playaudioYeaYeaYea(){
    this.audio.src = "https://cdn.discordapp.com/attachments/1090352770135101453/1090371454266245263/yea_yea_yea.mp3";
    this.audio.load();
    this.audio.play();
  } 
  playaudioWavy(){
    this.audio.src = "https://cdn.discordapp.com/attachments/1090352770135101453/1090371454597611560/wavy.mp3";
    this.audio.load();
    this.audio.play();
  } 
pauseMusic(){
  this.audio.pause();
}

GetInstuctions(): void{
  this.showInstructions = true;
  this.casted = true;
  this.tryAgain = false;
  this.openSettings = false;
}

Hide2(): void{
  this.displayRandom = false;
  this.casted = false;
  this.tryAgain = false;
  this.showInstructions = false;
  this.catchTrash = false;
  this.openSettings = false;
  this.hideInstructions = false;

}


  
  //potential delay log out for leaving All Blue
  // signOut(): void {
  //   setTimeout(()=>{
	// this.authService.signOut();
  // },5000);
  // the:false;
  // }    

  collapse() {
    this.isExpanded = false;
  }
  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  //OnInit
  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(user);
      this.loggedIn = (user != null);
      this.userService.addUser(this.user.id, this.user.name).subscribe((response) => {
      console.log(response);
    });
  });
}
}