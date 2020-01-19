import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  private productsURL: string = '/assets/items.json';
  private cartItems: any[] = [];
  private favoriteItems: any[] = [];

  constructor(private httpClient: HttpClient) { }

  /**
   * Makes a GET call to read items JSON file and returns response
   * @returns products from JSON file
   */
  getProducts() {
    return this.httpClient.get(this.productsURL);
  }

  /**
   * Returns the items/products added to cart
   * @returns products added to cart
   */
  getCartItems() {
    return this.cartItems;
  }

  /**
   * Adds the selected product to cart list
   * @param product adds the product to cart list
   */
  setCartItem(product) {
    this.cartItems.push(product);
  }

  /**
   * Removes a product from cart list
   * @param productId Id of a product to be removed from cart
   */
  removeCartItem(product) {
    for(let i = 0; i < this.cartItems.length;  i++) {
      if(this.cartItems[i].id == product.id) {
        this.cartItems.splice(i, 1);
      }
    }
  }

  /**
   * Removes all cart items
   */
  removeAllCartItems() {
    this.cartItems.length = 0;
  }

  /**
   * Returns count of cart items
   * @returns count of cart items
   */
  getCartItemCount() {
    return this.cartItems.length;
  }

  /**
   * Adds the product to favorite list
   * @param product product to be added to favorite list
   */
  setFavoriteItem(product) {
    this.favoriteItems.push(product);
  }

  /**
   * Removes an item from favorite list
   */
  removeFavoriteItem() {
    this.favoriteItems.pop();
  }

  /**
   * Returns the count of favourite items
   * @return favourite item count
   */
  getFavoriteItemCount() {
    return this.favoriteItems.length;
  }
}
