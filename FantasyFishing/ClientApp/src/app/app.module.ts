import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { NgxSliderModule } from "@angular-slider/ngx-slider";
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { FishesComponent } from './Components/fishes/fishes.component';
import { CaughtFishComponent } from './Components/caught-fish/caught-fish.component';
import { LeaderboardComponent } from './Components/leaderboard/leaderboard.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    FishesComponent,
    CaughtFishComponent,
    LeaderboardComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    SocialLoginModule,
    NgxSliderModule,

    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'fishing', component: FishesComponent },
      { path: 'caughtFish', component: CaughtFishComponent },
    ])
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '643619535895-sgcocrg6r9l25stj4ijr89a4g7m6j36n' 
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
    bootstrap: [AppComponent]
})
export class AppModule { }
