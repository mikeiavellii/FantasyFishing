import { Component} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  
  openSettings:boolean = false;
  loggedIn: boolean = false;
  displayRandom: boolean = false;
  displayReel: boolean = false;
  canCatchFish: boolean = false;
  tryAgain: boolean = false;
  casted: boolean = false;
  showInstructions: boolean = false;
  hideInstructions: boolean = false;
  hideBackground: boolean = false;
  catchTrash: boolean = false;

  audio: any = new Audio()

 playaudioSunBeam(){
    this.audio.src = "https://cdn.discordapp.com/attachments/1090352770135101453/1090352905439166465/blue_rock.mp3";
    this.audio.load();
    this.audio.play();
  }    
  
pauseMusic(){
  this.audio.pause();
}
Hide2(): void{
  this.displayRandom = false;
  this.casted = false;
  this.tryAgain = false;
  this.showInstructions = false;
  this.catchTrash = false;
  this.openSettings = false;
}
}
