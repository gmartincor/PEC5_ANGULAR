import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridBaseComponent } from './grid-base.component';

describe('GridBaseComponent', () => {
  let component: GridBaseComponent;
  let fixture: ComponentFixture<GridBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridBaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
