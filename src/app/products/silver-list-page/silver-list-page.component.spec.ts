import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SilverListPageComponent } from './silver-list-page.component';

describe('SilverListPageComponent', () => {
  let component: SilverListPageComponent;
  let fixture: ComponentFixture<SilverListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SilverListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SilverListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
