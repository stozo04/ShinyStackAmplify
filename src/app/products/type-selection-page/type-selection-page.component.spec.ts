import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeSelectionPageComponent } from './type-selection-page.component';

describe('TypeSelectionPageComponent', () => {
  let component: TypeSelectionPageComponent;
  let fixture: ComponentFixture<TypeSelectionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeSelectionPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypeSelectionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
