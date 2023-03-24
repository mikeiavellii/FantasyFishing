import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { CaughtFish } from 'src/app/Models/caught-fish';
import { Fish } from 'src/app/Models/fish';
import { FishService } from 'src/app/Services/fish.service';

@Component({
  selector: 'app-caught-fish',
  templateUrl: './caught-fish.component.html',
  styleUrls: ['./caught-fish.component.css']
})
export class CaughtFishComponent implements OnInit {

  constructor(private fishService: FishService, private authService: SocialAuthService) { }

  fish: Fish = {} as Fish;

  caughtFish: CaughtFish[] = [];

  loggedIn: boolean = false;
  display: boolean = false;
  sharkB: boolean = false;

  user: SocialUser = {} as SocialUser;

  money: number = 0;

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
      this.sharkB = this.sharkS();
    });
  }

  removeCaughtFish(id: number): void{
    this.fishService.removeCaughtFish(this.user.id, id).subscribe((response: CaughtFish) => {
      console.log(response);
      this.getCaughtFish();
    });
  }

  sharkS(): boolean{
    let sharkSet: Set<CaughtFish> = new Set (this.caughtFish.filter((cf:CaughtFish) => 
    cf.fishName.toLowerCase().includes('shark')
  ));
    return sharkSet.size >= 5;
  }

  // addTrophy(): void{
  //   this.trophy = true;

  //   if(this.caughtFish.includes(this.classes) ){
  //     console.log('You the Modest Fisher Trophy for catching 1 of each class!')
  //   }
  // }
}
