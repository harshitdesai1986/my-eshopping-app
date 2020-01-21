import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { ProductDataService } from './product-data.service';
import { of } from 'rxjs/internal/observable/of';

describe('AppComponent', () => {

  let appComponent: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let getProductsSpy;
  let spyProductDataService;
  let cartItems: any[] = [];
  let favoriteItems: any[] = [];
  let products = {
    "items": [
      {
        "src": "/assets/headphone.png",
        "title": "Headphone",
        "description": "Genuine headphone from XYZ.",
        "id": "76547657",
        "originalPrice": "100",
        "discount": "20",
        "additionalDiscount": "30",
        "stockCount": "5",
        "brand": "XYZ",
        "model": "#5467898",
        "material": "Fiber",
        "dimensions": "5 x 6 x 2",
        "ratings": "4",
        "totalRatings": "5",
        "reviewCount": "25",
        "finalPrice": 56
      },
      {
        "src": "/assets/t-shirt.png",
        "title": "T-Shirt",
        "description": "Genuine T-Shirt from XYZ.",
        "id": "234567",
        "originalPrice": "25",
        "discount": "20",
        "additionalDiscount": "10",
        "stockCount": "25",
        "brand": "XYZ",
        "model": "#5467898",
        "material": "Cotton",
        "dimensions": "XL",
        "ratings": "3",
        "totalRatings": "5",
        "reviewCount": "125",
        "finalPrice": 18
      }
    ]
  };

  beforeEach(async(() => {

    spyProductDataService = jasmine.createSpyObj('ProductDataService', ['getProducts', 'setCartItem',
      'getCartItems', 'removeAllCartItems', 'getCartItemCount', 'removeCartItem', 'getFavoriteItemCount', 'removeFavoriteItem', 'setFavoriteItem']);

    spyProductDataService.setCartItem.and.callFake((item) => {
      cartItems.push(item);
    });

    spyProductDataService.getCartItems.and.callFake(() => {
      return cartItems;
    });

    spyProductDataService.removeAllCartItems.and.callFake(() => {
      cartItems.length = 0;
    });

    spyProductDataService.getCartItemCount.and.callFake(() => {
      return cartItems.length;
    });

    spyProductDataService.removeCartItem.and.callFake((item) => {
      cartItems.pop();
    });

    spyProductDataService.getFavoriteItemCount.and.callFake(() => {
      return favoriteItems.length;
    });

    spyProductDataService.removeFavoriteItem.and.callFake(() => {
      favoriteItems.pop();
    });

    spyProductDataService.setFavoriteItem.and.callFake((item) => {
      favoriteItems.push(item);
    });

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [{ provide: ProductDataService, useValue: spyProductDataService }]
    });

    fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.componentInstance;
  }));

  it('should create the app', () => {
    expect(appComponent).toBeDefined();
  });

  it('should get all the products on component initialization, with no data in session', () => {
    getProductsSpy = spyProductDataService.getProducts.and.returnValue(of(JSON.parse(JSON.stringify(products))));
    fixture.detectChanges();
    expect(getProductsSpy.calls.any()).toBe(true, 'getProducts called');
    expect(appComponent.allProducts).toEqual(products);
  });

  it('should get all the products on component initialization, with data in session (page refresh scenario)', () => {
    getProductsSpy = spyProductDataService.getProducts.and.returnValue(of(JSON.parse(JSON.stringify(products))));
    spyOn(window.sessionStorage, 'setItem');
    spyOn(window.sessionStorage, 'getItem');
    window.sessionStorage.setItem('itemsInCart', JSON.parse(JSON.stringify(products)).items[0]);

    fixture.detectChanges();
    expect(getProductsSpy.calls.any()).toBe(true, 'getProducts called');
    expect(appComponent.allProducts).toEqual(products);
  });

  it('should toggle cart model', () => {
    expect(appComponent.toggleCartModal).toBe(false);
    appComponent.toggleCart();
    expect(appComponent.toggleCartModal).toBe(true);
  });

  it('should add product to cart', () => {
    appComponent.addToCart(JSON.parse(JSON.stringify(products)).items[1]);
    expect(appComponent.cartItemCount).toBeGreaterThanOrEqual(1);
  });

  it('should remove product from cart', () => {
    appComponent.removeCartItem(JSON.parse(JSON.stringify(products)).items[1]);
    expect(appComponent.cartItemCount).toBeGreaterThanOrEqual(0);
  });

  it('should toggle adding/removing favorite item', () => {
    expect(appComponent.favoriteItemCount).toBe(0);
    appComponent.toggleFavorite(JSON.parse(JSON.stringify(products)).items[1]);
    expect(appComponent.favoriteItemCount).toBe(1);
    appComponent.toggleFavorite(JSON.parse(JSON.stringify(products)).items[1]);
    expect(appComponent.favoriteItemCount).toBe(0);
  });
});
