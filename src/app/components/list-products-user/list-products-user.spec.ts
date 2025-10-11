import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductsUser } from './list-products-user';

describe('ListProductsUser', () => {
  let component: ListProductsUser;
  let fixture: ComponentFixture<ListProductsUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListProductsUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProductsUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
