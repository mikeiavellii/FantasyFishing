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
  caughtFish: CaughtFish[] = [];


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
