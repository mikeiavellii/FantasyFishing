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

  //Arrays
  AllFish: Fish[] = [];
  numbers: number[] = [
    5,6,7
  ]
  classes: string[] = [
    'actinopterygii',
    'chondrichthyes',
    'hyperoartia',
    'myxini'
  ]

  //Numbers
  random: number = 0;
  value: number = 0;

  //Booleans
  loggedIn: boolean = false;
  displayRandom: boolean = false;
  displayReel: boolean = false;
  canCatchFish: boolean = false;
  tryAgain: boolean = false;
  casted: boolean = false;
  showInstructions: boolean = false;
  hideInstructions: boolean = false;
  hideBackground: boolean = false;

  //Slider Bar
  options: Options = {
    floor: 0,
    ceil: 100,
    vertical: true,
    rightToLeft: true,
    translate: (value: number): string => {
      return value + ' meters';
    }
  };
  
  //Google
  user: SocialUser = {} as SocialUser;

  //OnInit
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


//Methods
  getFish(): void{
    this.fishService.getFish().subscribe((response: Fish[]) => {
      console.log(response);
      this.AllFish = response;
    });
  }

  getSingleFish(): void{
  //Booleans
    this.casted = true;
    this.canCatchFish = false;
    this.tryAgain = false;
    this.hideInstructions = false;

  //Determine if Failure
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

  //Class by Depth
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

    //Sort by depth
      let filtered: Fish[] = this.AllFish.filter(f => f.meta.scientific_Classification.class == classChoice);
      this.random = Math.floor(Math.random() * filtered.length)
      console.log(this.random, filtered[this.random]);
      //finding in main array
      this.random = this.AllFish.findIndex(f => f.id == filtered[this.random].id)
      
      //booleans pre cast
      this.displayReel = true;
      this.hideInstructions = true;
      setTimeout(()=>{
      //booleans post cast
      this.displayReel = false;
      this.displayRandom = true;
      },5000);
    }
  }
  
  GetInstuctions(): void{
    this.showInstructions = true;
    this.value = 0;
    this.casted = true;
    this.tryAgain = false;
  }

  Hide(): void{
    this.displayRandom = false;
    this.value = 0;
    this.casted = false;
    this.tryAgain = false;
    this.showInstructions = false;
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
