import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  constructor(private userService:UserService) { }

  Users: User[] = [];

  ngOnInit(): void {
    this.updateLeaderboard();
  }

  updateLeaderboard(): void {
    this.userService.getAllUsers().subscribe((response) => {
      this.Users = response.sort((a,b) => a.currency > b.currency? - 1 : 0);
    });
  }
}
