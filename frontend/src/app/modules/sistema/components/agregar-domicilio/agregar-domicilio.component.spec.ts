import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarDomicilioComponent } from './agregar-domicilio.component';

describe('AgregarDomicilioComponent', () => {
  let component: AgregarDomicilioComponent;
  let fixture: ComponentFixture<AgregarDomicilioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarDomicilioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarDomicilioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
