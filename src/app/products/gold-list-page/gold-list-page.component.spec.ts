import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldListPageComponent } from './gold-list-page.component';

describe('GoldListPageComponent', () => {
  let component: GoldListPageComponent;
  let fixture: ComponentFixture<GoldListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoldListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoldListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
