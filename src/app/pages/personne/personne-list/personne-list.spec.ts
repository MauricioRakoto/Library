import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonneList } from './personne-list';

describe('PersonneList', () => {
  let component: PersonneList;
  let fixture: ComponentFixture<PersonneList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonneList],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonneList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
