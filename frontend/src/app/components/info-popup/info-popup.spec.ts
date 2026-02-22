import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPopup } from './info-popup';

describe('InfoPopup', () => {
  let component: InfoPopup;
  let fixture: ComponentFixture<InfoPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoPopup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoPopup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
