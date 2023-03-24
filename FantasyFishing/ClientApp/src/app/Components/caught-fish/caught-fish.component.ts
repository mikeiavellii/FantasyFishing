import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { CaughtFish } from 'src/app/Models/caught-fish';
import { FishService } from 'src/app/Services/fish.service';


@Component({
  selector: 'app-caught-fish',
  templateUrl: './caught-fish.component.html',
  styleUrls: ['./caught-fish.component.css']
})
export class CaughtFishComponent implements OnInit {

  constructor(private fishService: FishService, private authService: SocialAuthService) { }

  caughtFish: CaughtFish[] = [];

  loggedIn: boolean = false;
  display: boolean = false;

  user: SocialUser = {} as SocialUser;

  // trophy: boolean = false;

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(user);
      this.loggedIn = (user != null);
      this.getCaughtFish();
    });
  }
  toggleDisplay(){
    this.display = !this.display;
  }

  getCaughtFish(): void{
    this.fishService.getCaughtFish(this.user.id).subscribe((response: CaughtFish[]) => {
      console.log(response);
      this.caughtFish = response;
    });
  }

  removeCaughtFish(id: number): void{
    this.fishService.removeCaughtFish(this.user.id, id).subscribe((response: CaughtFish) => {
      console.log(response);
      this.getCaughtFish();
    });
  }

  // addTrophy(): void{
  //   this.trophy = true;

  //   if(this.caughtFish.includes(this.classes) ){
  //     console.log('You the Modest Fisher Trophy for catching 1 of each class!')
  //   }
  // }
}
