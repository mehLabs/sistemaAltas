import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarSectorComponent } from './agregar-sector.component';

describe('AgregarSectorComponent', () => {
  let component: AgregarSectorComponent;
  let fixture: ComponentFixture<AgregarSectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarSectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
