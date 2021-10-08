import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserModalComponent } from './list-user-modal.component';

describe('ListUserModalComponent', () => {
  let component: ListUserModalComponent;
  let fixture: ComponentFixture<ListUserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUserModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
