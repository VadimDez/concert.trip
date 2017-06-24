import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcertPackageComponent } from './concert-package.component';

describe('ConcertPackageComponent', () => {
  let component: ConcertPackageComponent;
  let fixture: ComponentFixture<ConcertPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcertPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcertPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
