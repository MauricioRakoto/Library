import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatiereForm } from './matiere-form';

describe('MatiereForm', () => {
  let component: MatiereForm;
  let fixture: ComponentFixture<MatiereForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatiereForm],
    }).compileComponents();

    fixture = TestBed.createComponent(MatiereForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
