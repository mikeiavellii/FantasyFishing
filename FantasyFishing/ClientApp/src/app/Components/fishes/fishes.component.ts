import { Options } from '@angular-slider/ngx-slider';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { CaughtFish } from 'src/app/Models/caught-fish';
import { Fish, ImgLink, SciClass } from 'src/app/Models/fish';
import { FishService } from 'src/app/Services/fish.service';

@Component({
  selector: 'app-fishes',
  templateUrl: './fishes.component.html',
  styleUrls: ['./fishes.component.css']
})
export class FishesComponent implements OnInit {
  AllFish: Fish[] = [];

  displayRandom: boolean = false;

  random: number = 0;

  value: number = 0;

  options: Options = {
    floor: 0,
    ceil: 100,
    vertical: true
  };

  constructor(private fishService: FishService, private authService: SocialAuthService) { }

  user: SocialUser = {} as SocialUser;

  ngOnInit(): void{
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(user);
      this.loggedIn = (user != null);
      this.getFish();
    });
  }

  sliderChange():void{
    console.log(this.value);
  }

  getFish(): void{
    this.fishService.getFish().subscribe((response: Fish[]) => {
      console.log(response);
      this.AllFish = response;
    });
  }

  getSingleFish(): void{
    this.fishService.getSingleFish().subscribe(() => {
      this.random = Math.floor(Math.random() * this.AllFish.length)
      console.log(this.random, this.AllFish[this.random]);
      this.displayRandom = true;
    });
  }

  Hide(): void{
    this.displayRandom = false;
  }

  addCaughtFish( fishNAME: string, fishIMAGE: ImgLink, fishCLASS: SciClass): void{
    let newCatch: CaughtFish = {
      userId: this.user.id,
      fishName: fishNAME,
      imageLink: fishIMAGE,
      scientificClass: fishCLASS,
      fishImage: "",
    }
    console.log(newCatch);
    this.displayRandom = false;
    this.fishService.addCaughtFish(newCatch).subscribe((response: CaughtFish) => {
      console.log(response);
    });
  }

  loggedIn: boolean = false;
}
