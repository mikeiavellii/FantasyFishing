import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaughtFishComponent } from './caught-fish.component';

describe('CaughtFishComponent', () => {
  let component: CaughtFishComponent;
  let fixture: ComponentFixture<CaughtFishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaughtFishComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaughtFishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
