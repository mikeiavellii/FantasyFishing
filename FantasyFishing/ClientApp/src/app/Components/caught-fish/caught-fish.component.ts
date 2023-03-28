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
    return sharkSet.size >= 5;
  }

}
