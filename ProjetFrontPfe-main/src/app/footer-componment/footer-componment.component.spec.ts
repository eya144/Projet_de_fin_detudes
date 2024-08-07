import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponmentComponent } from './footer-componment.component';

describe('FooterComponmentComponent', () => {
  let component: FooterComponmentComponent;
  let fixture: ComponentFixture<FooterComponmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterComponmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
