import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopperListPageComponent } from './copper-list-page.component';

describe('CopperListPageComponent', () => {
  let component: CopperListPageComponent;
  let fixture: ComponentFixture<CopperListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CopperListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CopperListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
