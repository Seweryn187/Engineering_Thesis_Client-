import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentValueTableComponent } from './current-value-table.component';

describe('CurrentValueTableComponent', () => {
  let component: CurrentValueTableComponent;
  let fixture: ComponentFixture<CurrentValueTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentValueTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentValueTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
