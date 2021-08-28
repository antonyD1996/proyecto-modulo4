import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoOpinionesComponent } from './listado-opiniones.component';

describe('ListadoOpinionesComponent', () => {
  let component: ListadoOpinionesComponent;
  let fixture: ComponentFixture<ListadoOpinionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoOpinionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoOpinionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
