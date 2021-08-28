import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarOpinionComponent } from './agregar-opinion.component';

describe('AgregarOpinionComponent', () => {
  let component: AgregarOpinionComponent;
  let fixture: ComponentFixture<AgregarOpinionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarOpinionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarOpinionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
