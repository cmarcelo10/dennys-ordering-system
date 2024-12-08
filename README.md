# Dennys Ordering System - CPSC 481

This document is best viewed in a markdown previewer!

## Running the App - on Vercel:
Our project is hosted on Vercel, and can be accessed [here](https://dennys-ordering-system.vercel.app/).
While our website is completely functional on Desktop, the interface is designed to be viewed on a smartphone. When viewing the website on a
laptop, resize the browser window to a mobile size, or use Chrome's responsive sizing feature in the browser console.

You can also open our prototype web app by scanning this QR code on your phone!</br></br>
![QR Code](qr_code.png "Denny's Ordering System QR Code")

## Implemented Pages:
The following routes have been fully implemented in this prototype:

* Main Menu Page
* Review Order / Checkout page
* Main Menu / Sandwiches and Burgers
* Main Menu / Sandwiches and Burgers / Slamburger (customizing)
* Main Menu / Sandwiches and Burgers / Traditional Club Sandwich (customizing)
* Main Menu / Deals and Promos -> The "Seniors Discount" is the only discount that is applied.

Our app uses dynamic routing to determine what item is being customized or edited at any given time.</br>
The route for the "customizing" page for all other menu items in the Sandwiches and Burgers category will open to a valid page, 
but no customizations for the item will be available. Using the back button in the interface will return you to the Sandwiches and Burgers
category page.

## Additional Notes:
* With the exception of the Deals and Promos page, all buttons on the screen are *fully* functional, and will return some form of feedback.
* Using the forward and back buttons is **not** recommended when viewing this application. It can put the application in an invalid state.
* The application lacks any backend - refreshing the page will clear all data. 
    * Most cricital pages have guards that will prompt the browser to warn you about before reloading
    * If you're in the middle of edting an item in the cart and reload the page, you'll be shown a "Page not implemented" screen
    Pressing the back button will take you directly to the main menu.
  

- The Design Team of CPSC 481 T09 Group 3, 12/07/2024
