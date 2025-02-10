import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopularsPage } from './populars.page';

describe('PopularsPage', () => {
  let component: PopularsPage;
  let fixture: ComponentFixture<PopularsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
