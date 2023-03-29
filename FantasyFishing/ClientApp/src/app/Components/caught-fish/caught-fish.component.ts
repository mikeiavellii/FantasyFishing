import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit, ViewChild } from '@angular/core';

import { CaughtFish } from 'src/app/Models/caught-fish';
import { Fish } from 'src/app/Models/fish';
import { FishService } from 'src/app/Services/fish.service';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/user';
import { LeaderboardComponent } from '../leaderboard/leaderboard.component';



@Component({
  selector: 'app-caught-fish',
  templateUrl: './caught-fish.component.html',
  styleUrls: ['./caught-fish.component.css']
})
export class CaughtFishComponent implements OnInit {

  constructor(private fishService: FishService, private authService: SocialAuthService, private userService: UserService) { }

  fish: Fish = {} as Fish;
  UserData: User = {} as User;
  caughtFish: CaughtFish[] = [];

  loggedIn: boolean = false;
  display: boolean = false;
  sharkB: boolean = false;
  sharkP: boolean = false;
  sharkQ: boolean = false;
  sharkG: boolean = false;
  catfishN: boolean = false;
  catfishP: boolean = false;
  catfishF: boolean = false;
  onePiece: boolean = false;
  A5Fish: boolean = false
  A25Fish: boolean = false
  A200Fish: boolean = false
  A500Fish: boolean = false

  user: SocialUser = {} as SocialUser;

  money: number = 1;
  @ViewChild(LeaderboardComponent) leaderBoard!: LeaderboardComponent;
  // trophy: boolean = false;

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(user);
      this.loggedIn = (user != null);
      this.getCaughtFish();
      this.getUserData();
    });
  }

  

  getUserData():void{
    this.userService.getUserById(this.user.id).subscribe((response:User)=> {
      this.UserData = response;
      console.log(this.UserData);
    })
  }
  toggleDisplay(){
    this.display = !this.display;
  }

  getCaughtFish(): void{
    this.fishService.getCaughtFish(this.user.id).subscribe((response: CaughtFish[]) => {
      console.log(response);
      this.caughtFish = response;
      this.sharkB = this.sharkS();
    });
  }

  removeCaughtFish(id: number, caughtFish: CaughtFish): void{
    this.UserData.currency += caughtFish.fishName.length;
    this.fishService.removeCaughtFish(this.user.id, id).subscribe((response: CaughtFish) => {
      console.log(response);
      this.getCaughtFish();
      this.leaderBoard.updateLeaderboard();
    });
  }

  sharkS(): boolean{
    let sharkSet: Set<CaughtFish> = new Set (this.caughtFish.filter((cf:CaughtFish) => 
    cf.fishName.toLowerCase().includes('shark')
  ));
  this.A500Fish = true
    return sharkSet.size >= 5;
  }

  sharkA(): boolean{
    let sharkSet: Set<CaughtFish> = new Set (this.caughtFish.filter((cf:CaughtFish) => 
    cf.fishName.toLowerCase().includes('shark')
  ));
    return sharkSet.size >= 10;
  }

  sharkD(): boolean{
    let sharkSet: Set<CaughtFish> = new Set (this.caughtFish.filter((cf:CaughtFish) => 
    cf.fishName.toLowerCase().includes('shark')
  ));
    return sharkSet.size >= 15;
  }

  sharkO(): boolean{
    let sharkSet: Set<CaughtFish> = new Set (this.caughtFish.filter((cf:CaughtFish) => 
    cf.fishName.toLowerCase().includes('shark')
  ));
    return sharkSet.size >= 20;
  }

  catfishO(): boolean{
    let catfishSet: Set<CaughtFish> = new Set (this.caughtFish.filter((cf:CaughtFish) => 
    cf.fishName.toLowerCase().includes('catfish')
  ));
    return catfishSet.size >= 5;

  }

  catfishL(): boolean{
    let catfishSet: Set<CaughtFish> = new Set (this.caughtFish.filter((cf:CaughtFish) => 
    cf.fishName.toLowerCase().includes('catfish')
  ));
    return catfishSet.size >= 10;
  }

  catfishK(): boolean{
    let catfishSet: Set<CaughtFish> = new Set (this.caughtFish.filter((cf:CaughtFish) => 
    cf.fishName.toLowerCase().includes('catfish')
  ));
    return catfishSet.size >= 15;
  }

  onePieceM(): boolean{
    let onepieceSet: Set<CaughtFish> = new Set (this.caughtFish.filter((cf:CaughtFish) => 
    cf.fishName.toLowerCase().includes("humuhumunukunukuapua'a")
  ));
    return onepieceSet.size >= 1;
  }

  isCompleted(): boolean{
    if(this.getCaughtFish.length < 500){
      return false;
    }
    if(this.sharkB && this.sharkG && this.sharkQ && this.sharkP && this.catfishP && this.catfishF && this.catfishN && this.onePiece){
      return true;
    }
    else{
      return false;
    }
  }



  // addTrophy(): void{
  //   this.trophy = true;

  //   if(this.caughtFish.includes(this.classes) ){
  //     console.log('You the Modest Fisher Trophy for catching 1 of each class!')
  //   }
  // }
}
