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
  singleCatch: CaughtFish = {} as CaughtFish;

  constructor(private fishService: FishService) { }

  ngOnInit(): void{
    this.getFish();
  }

  getFish(): void{
    this.fishService.getFish().subscribe((response: Fish[]) => {
      console.log(response);
      this.AllFish = response;
    });
  }

  addCaughtFish(userID: string, fishNAME: string, fishIMAGE: ImgLink, fishCLASS: SciClass): void{
    let newCatch: CaughtFish = {
      userId: userID,
      fishName: fishNAME,
      imageLink: fishIMAGE,
      scientificClass: fishCLASS,
      fishImage: "",
    }
    console.log(newCatch);

    this.fishService.addCaughtFish(newCatch).subscribe((response: CaughtFish) => {
      console.log(response);
    });
  }

  userId: string = "googleId"
}
