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

  constructor(private fishService: FishService, private authService: SocialAuthService) { }

  AllFish: Fish[] = [];

  random: number = 0;
  value: number = 0;

  loggedIn: boolean = false;
  displayRandom: boolean = false;
  displayReel: boolean = false;
  canCatchFish: boolean = false;
  tryAgain: boolean = false;
  casted: boolean = false;

  classes: string[] = [
    'actinopterygii',
    'chondrichthyes',
    'hyperoartia',
    'myxini'
  ]
  numbers: number[] = [
    5,6,7
  ]

  options: Options = {
    floor: 0,
    ceil: 100,
    vertical: true,
    rightToLeft: true,
    translate: (value: number): string => {
      return value + ' meters';
    }
  };

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
    // console.log(this.value);
  }

  getFish(): void{
    this.fishService.getFish().subscribe((response: Fish[]) => {
      console.log(response);
      this.AllFish = response;
    });
  }

  getSingleFish(): void{
 
    this.casted = true;

    this.canCatchFish = false;

    this.tryAgain = false;

    let pickNumber:number = Math.floor((Math.random() * this.numbers.length)) + 1;
    
    console.log(pickNumber)

    if (pickNumber == 1){
      this.canCatchFish = true;
    }
    else if(pickNumber == 2){
      this.canCatchFish = true;
    }
    else if(pickNumber == 3){
      this.tryAgain = true;
    }

    let classChoice: string = "";
    if(this.canCatchFish == true) {

      if(this.value >= 1 && this.value <= 25){
        classChoice = this.classes[0];
      }
      else if(this.value >= 26 && this.value <= 50){
        classChoice = this.classes[1];
      }
      else if(this.value >= 51 && this.value <= 75){
        classChoice = this.classes[2];
      }
      else if(this.value >= 76 && this.value <= 100){
        classChoice = this.classes[3];
      }
      console.log(classChoice);
      let filtered: Fish[] = this.AllFish.filter(f => f.meta.scientific_Classification.class == classChoice);
      this.random = Math.floor(Math.random() * filtered.length)
      console.log(this.random, filtered[this.random]);
      //finding in main array
      this.random = this.AllFish.findIndex(f => f.id == filtered[this.random].id)
      
      this.displayReel = true;
      setTimeout(()=>{
      this.displayReel = false;
      this.displayRandom = true;
      },5000);
    }
  }

  Hide(): void{
    this.displayRandom = false;
    this.value = 0;
    this.casted = false;
    this.tryAgain = false;
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
    this.value = 0;
    this.casted = false;
  }
}
