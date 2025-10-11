import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductUserPage } from './product';

describe('Product', () => {
  let component: ProductUserPage;
  let fixture: ComponentFixture<ProductUserPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductUserPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
