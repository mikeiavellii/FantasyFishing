import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBlueComponent } from './all-blue.component';

describe('AllBlueComponent', () => {
  let component: AllBlueComponent;
  let fixture: ComponentFixture<AllBlueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllBlueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllBlueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
