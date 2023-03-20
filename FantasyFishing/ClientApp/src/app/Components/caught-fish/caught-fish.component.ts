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

  constructor(private fishService: FishService) { }

  ngOnInit(): void {
    this.getCaughtFish();
  }

  getCaughtFish(): void{
    this.fishService.getCaughtFish(this.userId).subscribe((response: CaughtFish[]) => {
      console.log(response);
      this.caughtFish = response;
    });
  }
  userId: string = "googleId";
}
