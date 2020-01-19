import { Component, OnInit } from '@angular/core';
import { ProductDataService } from './product-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  toggleCartModal: boolean = false;
  allProducts: any = {};
  productToDisplay: any = {};
  discountedPriceToDisplay: number = 0;
  finalPriceToDisplay: number = 0;
  cartItemCount: number = 0;
  itemsInCart: any[] = [];
  favoriteItemCount: number = 0;
  totalCartValue: number = 0;

  constructor(private productDataService: ProductDataService) { }

  ngOnInit() {
    let self = this;

    // Gets all the products from service
    this.productDataService.getProducts().subscribe(products => {
      this.allProducts = products;

      // Calculates final product price and adds it to object
      this.allProducts.items.forEach(product => {
        product.finalPrice = this.calculateDiscountedPrice(product);
        console.log(product.finalPrice, product.title);
      });

      // Displays very first item to home page by default
      this.displayItemOnHome(this.allProducts.items[0]);

      if(!sessionStorage.getItem('itemsInCart')) {
        // Set default cart item
        self.productDataService.setCartItem(this.allProducts.items[1]);
        // Get cart items from service
        this.itemsInCart = self.productDataService.getCartItems();
        sessionStorage['itemsInCart'] = JSON.stringify(this.itemsInCart);
      } else {
        // Removes all cart items
        self.productDataService.removeAllCartItems();
        this.itemsInCart = JSON.parse(sessionStorage['itemsInCart']);
        this.itemsInCart.forEach(item => {
          self.productDataService.setCartItem(item);
        });
      }

      // Calculates and displays total cart value
      this.calculateFinalCartValue();

      // Gets Cart item count
      this.cartItemCount = self.productDataService.getCartItemCount();

    }, error => {
      console.log("Error in retrieving products", error);
    });
    
  }

  /**
   * Calculates the discounted and final selling prices 
   * @param product product for which the final selling price bo to calculated
   */
  calculateDiscountedPrice(product): number {
    let originalPrice = Number(product.originalPrice);
    this.discountedPriceToDisplay = originalPrice - (originalPrice * (Number(product.discount)/100));
    let finalPrice = this.discountedPriceToDisplay - (this.discountedPriceToDisplay * (Number(product.additionalDiscount)/100));
    return finalPrice;
  }

  /**
   * Displays the product on home page
   * @param product product to be displayed on page
   */
  displayItemOnHome(product) {
    this.productToDisplay = product;
    this.finalPriceToDisplay = this.calculateDiscountedPrice(this.productToDisplay); 
  }

  /**
   * Toggle cart item model
   */
  toggleCart(): void {
    this.toggleCartModal = !this.toggleCartModal;
  }

  /**
   * Calculates and displays total cart value
   */
  calculateFinalCartValue() {
    this.totalCartValue = 0;
    this.itemsInCart.forEach(item => {
      this.totalCartValue += item.finalPrice;
    });
  }

  /**
   * Adds the product to cart
   * @param product Product to be added to cart
   */
  addToCart(product) {
    this.productDataService.setCartItem(product); 
    this.cartItemCount = this.productDataService.getCartItemCount();
    this.itemsInCart = this.productDataService.getCartItems();
    sessionStorage['itemsInCart'] = JSON.stringify(this.itemsInCart);
    this.calculateFinalCartValue();
  }

  /**
   * Removes the product from cart
   * @param product Product to be removed from cart
   */
  removeCartItem(product) {
    this.productDataService.removeCartItem(product);
    this.cartItemCount = this.productDataService.getCartItemCount();
    this.itemsInCart = this.productDataService.getCartItems();
    sessionStorage['itemsInCart'] = JSON.stringify(this.itemsInCart);
    if(this.cartItemCount === 0) {
      sessionStorage.removeItem('itemsInCart');
    }
    this.calculateFinalCartValue();
  }

  /**
   * Adds/Removes the product to/from favorite list
   * @param product Product to be added/removed as favorite
   */
  toggleFavorite(product) {
    if(this.productDataService.getFavoriteItemCount() === 1) {
      this.productDataService.removeFavoriteItem();
    } else {
      this.productDataService.setFavoriteItem(product);
    }

    this.favoriteItemCount = this.productDataService.getFavoriteItemCount();
  }
}
