# Table of Contents
1. [Tools/Technologies Used](#section1)
2. [Run application](#section2)
3. [Solution Notes](#section3)
4. [Application Usage Guide](#section4)

<div id='section1'/>

# Tools/Technologies Used
1. Node JS version 12.x
    - Link: https://nodejs.org/en/download/
2. Angular 8 CLI
```javascript
npm install -g @angular/cli
```
3. lite-server (To run Angular production ready code)
```javascript
npm install -g lite-server
```

<div id='section2'/>

# Run application
1. Install **Node JS** version 12.x
2. Install **lite-server** using NPM
3. Open terminal/CMD at main directory and execute following
```javascript
lite-server --baseDir="dist/my-eshopping-app"
```
**PS.** This will start the Angular(Frontend) application in your default browser on port 3001

<div id='section3'/>

# Solution Notes
- The decision of choosing **Angular 8, Typescript and ES6 standards** as a technology:
    - I have a decent experience with the technology
    - One of the booming technology in the market
    - One of the latest technology with support from library provider, Google
- Single page application
- **SCSS (SASS)** is used instead of CSS
- **Flexbox** is used to achieve responsiveness and alignment of page contents
- By default, 1 product is displayed, but through code you can choose from 3 items
- A JSON file has been created, to fetch complete product details
- Discounted and additionally discounted prices are calculated from the data coming from JSON file
- By default 1 product is added in a cart
- A small model popup is created to display cart items
- Tried achieving the UX as mush as possible
- Application supports below **resolutions/devices**:
    - Desktop 1024px x 768px and above
    - iPad Portrait
    - iPad Landscape
- Cart items remains on page refresh
- Item(s) can be deleted from cart
- Total cart value can be seen

**PS.** Find the production ready code in "dist" directory.

<div id='section4'/>

# Application Usage Guide
1. From the title bar:
    - Click on cart icon to see cart model popup displaying 1 default item in cart
    - Click on cart model popup cross(x) button or cart button to close popup
    - Click on the product cross (x) icon, to remove perticular item from cart
        - Cart item count and total cart value gets updated on addition and removal
    - Click on heart (favorite) icon to add or remove current item to/from favorite list
        - The counter on the heart icon gets updated based on addition and removal
2.  From the main container:
    - Product image can be seen on the left part
    - All the product details, including calculated discounted price on right part
    - Click on Add To Basket button to add item to the cart:
        - The count on the cart icon gets updated
        - The cart total value gets updated
    - The stars (ratings) are updated/highlighted based on the ratings coming from JSON
