import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEmpleadoDialogoComponent } from './agregar-empleado-dialogo.component';

describe('AgregarEmpleadoDialogoComponent', () => {
  let component: AgregarEmpleadoDialogoComponent;
  let fixture: ComponentFixture<AgregarEmpleadoDialogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarEmpleadoDialogoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarEmpleadoDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
