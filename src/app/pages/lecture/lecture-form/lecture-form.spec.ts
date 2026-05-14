import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureForm } from './lecture-form';

describe('LectureForm', () => {
  let component: LectureForm;
  let fixture: ComponentFixture<LectureForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LectureForm],
    }).compileComponents();

    fixture = TestBed.createComponent(LectureForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
