import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonneForm } from './personne-form';

describe('PersonneForm', () => {
  let component: PersonneForm;
  let fixture: ComponentFixture<PersonneForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonneForm],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonneForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
