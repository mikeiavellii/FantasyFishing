import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialModeComponent } from './tutorial-mode.component';

describe('TutorialModeComponent', () => {
  let component: TutorialModeComponent;
  let fixture: ComponentFixture<TutorialModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorialModeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorialModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
