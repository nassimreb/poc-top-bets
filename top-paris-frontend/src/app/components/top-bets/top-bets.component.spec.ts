import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBetsComponent } from './top-bets.component';

describe('TopBetsComponent', () => {
  let component: TopBetsComponent;
  let fixture: ComponentFixture<TopBetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopBetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopBetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
