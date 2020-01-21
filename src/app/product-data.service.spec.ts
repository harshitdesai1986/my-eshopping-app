import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductDataService } from './product-data.service';

describe('ProductDataService', () => {

  let service: ProductDataService;
  let httpMock: HttpTestingController;
  let product = {
    id: 123
  },
    product2 = {
      id: 1234
    };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.get(ProductDataService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all the products', (done) => {
    service.getProducts().subscribe(products => {
      expect(products).toEqual({
        items: [
          {
            "id": "12345",
          }
        ]
      });

      done();
    });

    let productRequest = httpMock.expectOne('/assets/items.json');
    productRequest.flush({
      items: [
        {
          "id": "12345",
        }
      ]
    });

    httpMock.verify();
  });

  it('should set cart item', () => {
    service.setCartItem(product);
    expect(service.getCartItemCount()).toEqual(1);
  });

  it('should get cart items', () => {
    service.setCartItem(product);
    service.setCartItem(product2);
    expect(service.getCartItems()[0].id).toEqual(123);
    expect(service.getCartItems()[1].id).toEqual(1234);
  });

  it('should remove cart item', () => {
    service.setCartItem(product);
    service.setCartItem(product2);
    expect(service.getCartItemCount()).toEqual(2);
    service.removeCartItem(product);
    expect(service.getCartItemCount()).toEqual(1);
    service.removeCartItem(product2);
    expect(service.getCartItemCount()).toEqual(0);
  });

  it('should remove all cart items', () => {
    service.removeAllCartItems();
    expect(service.getCartItemCount()).toEqual(0);
  });

  it('should set favorite item', () => {
    service.setFavoriteItem(product);
    expect(service.getFavoriteItemCount()).toEqual(1);
  });

  it('should remove favorite item', () => {
    service.setFavoriteItem(product);
    expect(service.getFavoriteItemCount()).toEqual(1);
    service.removeFavoriteItem();
    expect(service.getFavoriteItemCount()).toEqual(0);
  });
});
