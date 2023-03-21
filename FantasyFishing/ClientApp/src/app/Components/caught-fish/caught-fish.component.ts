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
  caughtFish: CaughtFish[] = [];

  removeCaughtFish(id: number): void{
    this.fishService.removeCaughtFish(this.user.id, id).subscribe((response: CaughtFish) => {
      console.log(response);
      this.getCaughtFish();
    });
  }

  constructor(private fishService: FishService, private authService: SocialAuthService) { }
  loggedIn: boolean = false;

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(user);
      this.loggedIn = (user != null);
      this.getCaughtFish();
    });
  }

  getCaughtFish(): void{
    this.fishService.getCaughtFish(this.user.id).subscribe((response: CaughtFish[]) => {
      console.log(response);
      this.caughtFish = response;
    });
  }
  user: SocialUser = {} as SocialUser;

}
