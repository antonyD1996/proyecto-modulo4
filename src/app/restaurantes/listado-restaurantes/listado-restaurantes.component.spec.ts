import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoRestaurantesComponent } from './listado-restaurantes.component';

describe('ListadoRestaurantesComponent', () => {
  let component: ListadoRestaurantesComponent;
  let fixture: ComponentFixture<ListadoRestaurantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoRestaurantesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoRestaurantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
