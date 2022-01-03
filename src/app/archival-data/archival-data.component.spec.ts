import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivalDataComponent } from './archival-data.component';

describe('ArchivalDataComponent', () => {
  let component: ArchivalDataComponent;
  let fixture: ComponentFixture<ArchivalDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivalDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
