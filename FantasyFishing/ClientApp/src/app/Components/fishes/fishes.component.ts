import { Options } from '@angular-slider/ngx-slider';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { CaughtFish } from 'src/app/Models/caught-fish';
import { Fish, ImgLink, SciClass } from 'src/app/Models/fish';
import { FishService } from 'src/app/Services/fish.service';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-fishes',
  templateUrl: './fishes.component.html',
  styleUrls: ['./fishes.component.css','./fishes.component.scss']
})
export class FishesComponent implements OnInit {

  constructor(private fishService: FishService, private authService: SocialAuthService, private userService: UserService) { }

  //Arrays
  AllFish: Fish[] = [];
  numbers: number[] = [
    1,2,3,4,5,6,7,8
  ]
  trashType: number[] = [
    1,2,3
  ]
  classes: string[] = [
    'actinopterygii',
    'chondrichthyes',
    'hyperoartia',
    'myxini'
  ]
  trashes: string[] = [
    'old shoe',
    'tin can',
    'sewaeed'
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
  catchTrash: boolean = false;
  catchNemo: boolean = false;

  //Rod Buffs
  betterRod: boolean = false;
  //cleanWaters
  cleanWaters: boolean = false;
  //Reel Buffs
  fasterReel: boolean = false;

  //settings
  openSettings: boolean = false;

  UserData: User = {} as User;

  //Slider Bar
  options: Options = {
    floor: 0,
    ceil: 100,
    vertical: true,
    rightToLeft: true,

    translate: (value: number): string => {
      return value + ' meters';
    },
    showSelectionBar: true,
    
    getSelectionBarColor: (value: number): string => {
      if (value > 75) {
          return 'red';
      }
      if (value > 50 && value <=75) {
          return 'orange';
      }
      if (value > 25 && value <=50) {
          return 'yellow';
      }
      return '#2AE02A';
  }
}
  
  //Google
  user: SocialUser = {} as SocialUser;

  //OnInit
  ngOnInit(): void{
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(user);
      this.loggedIn = (user != null);
      this.getFish();
      this.getUserData();
    });
  }

  getUserData():void{
    this.userService.getUserById(this.user.id).subscribe((response:User)=> {
      this.UserData = response;
      console.log(this.UserData);
      this.betterRod = this.UserData.betterRod;
      this.cleanWaters = this.UserData.cleanWaters;
      this.fasterReel = this.UserData.fasterReel;
    })
  }

  sliderChange():void{
    // console.log(this.value);
  }
    // let circle = document.querySelector('.circle') as HTMLElement;
    // const moveBy = 10;
  
    // window.addEventListener('load', () => {
    //   circle.style.position = 'absolute';
    //   circle.style.left = '0';
    //   circle.style.top = '0';
    // });
  
    // window.addEventListener('keyup', (e: KeyboardEvent) => {
    //   switch (e.key) {
    //     case 'ArrowLeft':
    //       circle.style.left = `${parseInt(circle.style.left) - moveBy}px`;
    //       break;
    //     case 'ArrowRight':
    //       circle.style.left = `${parseInt(circle.style.left) + moveBy}px`;
    //       break;
    //     case 'ArrowUp':
    //       circle.style.top = `${parseInt(circle.style.top) - moveBy}px`;
    //       break;
    //     case 'ArrowDown':
    //       circle.style.top = `${parseInt(circle.style.top) + moveBy}px`;
    //       break;
    //   }
    // });


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
      this.canCatchFish = true;
    }
    else if(pickNumber == 4){
      this.tryAgain = true;
    }
    else if(pickNumber == 5){
      if(this.betterRod == false){
      this.tryAgain = true;
      }
      else{
      this.canCatchFish = true;
      }
    }
    else if(pickNumber == 6){
      if(this.betterRod == false){
        this.tryAgain = true;
      }
      else{
      this.canCatchFish = true;
      }
    }
    else if(pickNumber == 7){
        if(this.cleanWaters == false){
          setTimeout(() => {this.catchTrash = true}, 1000);
        }
        else{
          this.canCatchFish = true;
        }
    
    }
    else if(pickNumber == 8){
       if(this.cleanWaters==false){
        setTimeout(() => {this.catchTrash = true}, 1000);
       }
       else{
         this.canCatchFish = true;
       }
   };
    //Pick Trash
    // let trashChoice: string = "";
    // if(this.catchTrash == true) {
    // let choiceNumber:number = Math.floor((Math.random() * this.trashType.length)) + 1;
    // console.log(pickNumber)
    //   if(choiceNumber == 1) {
    //     trashChoice = this.trashes[0];
    //   }
    //   else if(pickNumber == 2){
    //     trashChoice = this.trashes[1];
    //   }
    //   else if(pickNumber == 3){
    //     trashChoice = this.trashes[2];
    //   }
    // }

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
      },this.fasterReel?1500:5000,
    )};
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
    this.catchTrash = false;
    this.catchNemo = false;
    this.openSettings = false;
  }

  addCaughtFish( fishNAME: string, fishIMAGE: ImgLink, fishCLASS: SciClass): void{
    let newCatch: CaughtFish = {
      userId: this.user.id,
      fishName: fishNAME,
      imageLink: fishIMAGE,
      fishImage: "",
      scientificClass: fishCLASS,
      fishClass: fishCLASS.class,
      fishOrder: fishCLASS.order,
      fishFamily: fishCLASS.family,
      genus: fishCLASS.genus,
      species: fishCLASS.species,
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
