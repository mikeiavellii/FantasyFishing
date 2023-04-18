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
  orders: string [] = [
    "siluriformes", "esociformes", "scombriformes", "clupeiformes", "beryciformes", "scorpaeniformes", "lepisosteiformes", "perciformes", "squatiniformesf._de_buen", "cichliformes", "acanthuriformes", 
    "cypriniformes", "lophiiformes", "lophiiformesgarman", "gadiformes", "osteoglossiformes", "anguilliformes", "salmoniformes", "carcharhiniformes", "beloniformes", "atheriniformes", "osmeriformes", 
    "dipnoi", "labriformes", "orectolobiformes", "cyprinodontiformes", "stomiiformes", "istiophoriformes", "aulopiformes", "argentiniformes", "lamniformes", "polymixiiformes", "myliobatiformes", 
    "gonorynchiformes", "acipenseriformes", "anabantiformes", "polypteriformesbleeker", "myctophiformes", "characiformes", "scombrolabraciformes", "trachiniformes", "tetraodontiformes", 
    "blenniiformesbleeker", "gobiiformes", "albuliformes", "amiiformes", "squaliformes", "pleuronectiformes", "gymnotiformes", "petromyzontiformes", "gasterosteiformes", "heterodontiformesl._s._berg", 
    "carangiformes", "kurtiformes", "orectolobiformesapplegate", "siluriformesg._cuvier", "chimaeriformesobruchev", "gobiesociformes", "actinistiacope", "blenniiformes"
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

  //Buffs
  betterRod: boolean = false;
  cleanWaters: boolean = false;
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
      return value + ' m';
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
        setTimeout(() => {this.catchNemo = true}, 1000);
       };

    //Class by Depth
    let classChoice: string = "";
    if(this.canCatchFish == true) {
      if(this.value >= 1 && this.value <= 10){
        classChoice = this.orders[0]+this.orders[1] + this.orders[2]+this.orders[3]+this.orders[4]+this.orders[5];
      }
      else if(this.value >= 11 && this.value <= 20){
        classChoice = this.orders[6]+this.orders[7]+this.orders[8]+this.orders[9]+this.orders[10]+this.orders[11];
      }
      else if(this.value >= 21 && this.value <= 30){
        classChoice = this.orders[12]+this.orders[13]+this.orders[14]+this.orders[15]+this.orders[16]+this.orders[17];
      }
      else if(this.value >= 31 && this.value <= 40){
        classChoice = this.orders[18]+this.orders[19]+this.orders[20]+this.orders[21]+this.orders[22]+this.orders[23];
      }
      else if(this.value >= 41 && this.value <= 50){
        classChoice = this.orders[24]+this.orders[25]+this.orders[26]+this.orders[27]+this.orders[28]+this.orders[29];
      }
      else if(this.value >= 51 && this.value <= 60){
        classChoice = this.orders[30]+this.orders[31]+this.orders[32]+this.orders[33]+this.orders[34]+this.orders[35];
      }
      else if(this.value >= 61 && this.value <= 70){
        classChoice = this.orders[36]+this.orders[37]+this.orders[38]+this.orders[39]+this.orders[40]+this.orders[41];
      }
      else if(this.value >= 71 && this.value <= 80){
        classChoice = this.orders[42]+this.orders[43]+this.orders[44]+this.orders[45]+this.orders[46]+this.orders[47];
      }
      else if(this.value >= 81 && this.value <= 90){
        classChoice = this.orders[48]+this.orders[49]+this.orders[50]+this.orders[51]+this.orders[52]+this.orders[53];
      }
      else if(this.value >= 91 && this.value <= 100){
        classChoice = this.orders[54]+this.orders[55]+this.orders[56]+this.orders[57]+this.orders[58]+this.orders[59];
      }
      console.log(classChoice);

    //Sort by depth
      let filtered: Fish[] = this.AllFish.filter(f =>{ 
        if(f.meta.scientific_Classification.order != null){
          return classChoice.toLowerCase().includes(f.meta.scientific_Classification.order.toLowerCase())
        }
        else {
          return false;
        }
      });
      console.log(filtered);
      let result =  filtered[Math.floor(Math.random()*filtered.length)];
      console.log(result);
      //finding in main array
      this.random = this.AllFish.findIndex(f => f.id == result.id)
      
      //booleans pre cast
      this.displayReel = true;
      this.hideInstructions = true;
      setTimeout(()=>{
      //booleans post cast
      this.displayReel = false;
      this.displayRandom = true;
      },this.fasterReel?8500:5000,
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
