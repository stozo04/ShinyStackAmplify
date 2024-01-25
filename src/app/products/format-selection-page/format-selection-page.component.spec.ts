import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormatSelectionPageComponent } from './format-selection-page.component';

describe('TypeSelectionPageComponent', () => {
  let component: FormatSelectionPageComponent;
  let fixture: ComponentFixture<FormatSelectionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormatSelectionPageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormatSelectionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
