# User Prompts Log

This document records all user prompts provided during the development of **The Breakfast Club** project, organized chronologically.

---

### Prompt 1: Initial Workspace Cleanup
> clear all the content already present their in the app to start from fresh

---

### Prompt 2: CSS Cleanup
> You haven't cleared the global.css

---

### Prompt 3: Initial Project Requirements & Page Routes
> First I will work on the frontend and need your assistance.
> 
> We are building a website for a breakfast club to take orders and reservation 
> 
> There will be 6 pages namely:
> 1. Home – app/page.js
> 2. Menu – app/Menu/page.js
> 3. Reservation – app/Reservation/page.js
> 4. Contact– app/Contact/page.js
> 5. Review– app/Review/page.js
> 6. About – app/About/page.js

---

### Prompt 4: Implementation Plan Feedback & Scaffolding Scope
> - **Don't add any icons yet**
> - **Do not add any routing logic**
> - **Lower are good for me if they are the convention.**
> - **Do not add any styling yet.**
> - **Right now I only want a basic structure of each route. Nothing complex or involving any kind of logic.**
> - **No Colors for now**
> - **No UI component to add yet.**
> - **I want only setting up the basic structure of the routes mentioned and noothing more**

---

### Prompt 5: Home Page Header Requirements
> Now get into the following:
> app/page.js
> 
> This the home tab.
> 
> Now we will start with making the frontend first.
> 
> Make a simple header with the following inside it:
> - A home icon – public\icons\home.png
> - Menu.
> - reservation. 
> - Contact Us. 
> - Reviews.
> - About Us.
> - logo – public\breakfast_club_logo.png
> 
> make the styling in such a way that everything looks evenly placed
> 
> Put the home icon to the left and breakfast club icon to the right and every other thing mentioned in between them.

---

### Prompt 6: Hero Section Structure
> Now in your mind divide the main section of the home page into parts.
> 
> - hero section
> - dishes section (Top dishes)
> - Top reviews section
> 
> Hero Section:
> Inside this section do the following:
> - add a ontainer and inside that container a  hero image – public\hero.png
> - in the center of that container on the hero image put another container containing the following things:
>    - Title: "Thw Breakfast Club"
>    - Tagline: "The perfect spot for your next breakfast or brunch!"
>    - CTA buttons: Menu and Reservation
>    - All these things centered inside the container
> 
> Do this and after that I will tell you further what to do

---

### Prompt 7: Component Refactoring Request
> I have noticed one thing that you have put all the code into one page.js
> 
> You can create components because in that way it would be more manegable
> 
> Before making components do tell me what component you are making so that I can approve

---

### Prompt 8: Component Refactoring Approval
> Go on

---

### Prompt 9: Hero Section Layout Adjustments
> In the hero section redice the width of the hero image and make margin-x auto and also give margin from the top so that it looks separated from the header.

---

### Prompt 10: Yellow Section Separation Line
> give a yellow border/line separation between different section of the home page

---

### Prompt 11: Image Button Replacement & Universal Header Layout
> I have found some buttons online to replace instead of simple text. These are images.
> 
> The images are following:
> public\buttons\menu.png
> public\buttons\aboutus.png
> public\buttons\contactus.png
> public\buttons\reservations.png
> public\buttons\reviews.png
> 
> Place these images as buttons in place of the text currently present there.
> 
> Look for all the places on the home page to replace these.
> 
> Also I want the navbar/header to appear in all of the six pages so make it universal and my suggestion is to put it in the layout.js in the app folder. Rest it upto you waht you think is the best

---

### Prompt 12: Hero Border and 3D Effect Request
> Also give border to the hero image along with drop shadow to give it a 3D effect.

---

### Prompt 13: Black Border Request
> Drop shadow is not given and keep border black

---

### Prompt 14: Adding 3D Drop Shadow & Black Border
> no drop shadow added. It is just a bland black border and is not looking good

---

### Prompt 15: Top Dishes Section Layout
> Now we will start with the top dishes section.
> 
> Requirements:
> - Make a container with width same as the hero-section container
> - Make this container centered
> - divide the contiainer into two halves with right have occupying 60% and left one occupying 40%.
> - In the left half write the follwoing
>    - H2 – Top Dishes Of The Season
>    - p – A curated selection of our customer favorites, highlighting our current top dishes. Scroll through to see what's cookin' good lookin'
>    - Add a menu button image below the paragraph in this part of top dishes section.
> 
> Do this and then I will tell you further what to do.
> 
> Do not add any functionality

---

### Prompt 16: Top Dishes Section Carousel Design
> Design the **right half of the "Top Dishes" section** as an interactive, auto-rotating image carousel with a premium, modern feel.
> 
> Layout
> 
> - Create a horizontal container displaying multiple dish images.
> - Position one image in the exact center as the **active/focused** item.
> - Show the previous and next images partially on either side to indicate there are more dishes.
> 
> Active & Inactive States
> 
> - The **center (active) image** should:
> 
>   - Display in full color.
>   - Have a soft light-yellow (#F5D76E or similar) background/accent behind it.
>   - Be slightly larger than the surrounding images.
>   - Include a subtle shadow or elevation to emphasize focus.
> - Inactive images should:
> 
>   -  Be displayed in grayscale (black and white).
>   - Be slightly smaller and less prominent than the active image.
>   - Transition smoothly to full color when they become active.
> 
> Carousel Behavior
> 
> - The carousel should automatically slide from right to left at regular intervals.
> - Each transition should be smooth, using easing and subtle scaling animations.
> - Users should also be able to navigate manually using left and right arrow buttons.
> - Manual navigation should reset the auto-slide timer.
> - The carousel should loop infinitely.
> 
> Progress Indicator
> 
> - Add a thin horizontal progress bar along the bottom of the carousel.
> - The progress bar should use the same yellow accent color as the active image.
> - During the display time of the current slide, the bar should gradually fill from left to right.
> - When the carousel advances to the next image, the bar should reset and begin filling again.
> - The animation should remain synchronized whether slides change automatically or via the navigation buttons.
> 
> Interactions & Animations
> 
> - Use smooth transitions (300–500 ms) for:
> 
>   - Image movement
>   - Scaling
>   - Background color changes
>   - Grayscale-to-color transitions
> - Ensure the carousel feels fluid and polished without abrupt motion.
> 
> Responsive Behavior
> 
> - Maintain the centered active image on all screen sizes.
> - On smaller screens, reduce the number of visible side images while preserving the active/inactive styling and carousel functionality.
> 
> Overall Style
> 
> The carousel should feel elegant, premium, and modern, complementing the restaurant's visual identity. The yellow accent should draw attention to the featured dish without overwhelming the design, while the grayscale inactive images should naturally guide the user's focus toward the highlighted dish.

---

### Prompt 17: Dish Card Design & Progressive Step Bar
> Somewhat may be it is correct but mostly no, I dont want it like this.
> 
> What I want is that instead of making a giant circle wth image of food inside it, make a card with image, name and descripton of the food.
> 
> As far as loading bar is concerned, I dont want a loading bar as such.
> 
> What I want is that a yellow bar is there at the bottom. Now each time either automatically or manually the image shofts from the current image to the next right one the bar increase progressively and at the end when we have reached the right most image it rolls back to the left most one. For each crousle there should be some time for automatic crousel only not manual and no need to show any timing bar

---

### Prompt 18: Card Width Adjustment
> perfecto. Just now decrease the width of the card a little

---

### Prompt 19: Card Background & Hover Colors
> make the original background rgb(252, 229, 151) and on hover  rgb(255, 196, 106)

---

### Prompt 20: Pointer Cursor on Active Card
> on the focused image in the center the cursor should be pointer whch is notthe case now.

---

### Prompt 21: Replace Hero Buttons with Login & Signup
> Replace the menu and reservation image buttons inside the hero section with Login (public\buttons\Login.png) and Signup (public\buttons\Signup.png) button image

---

### Prompt 22: Button Size Discrepancy Query
> why the Login and Signup buttons are so small as compared to other buttons

---

### Prompt 23: Signup Button Size Correction
> the signup image is still very large

---

### Prompt 24: Equalizing Login & Signup Button Sizes
> look into this image and see the difference in sizes of the buttons. Please fix this problem. 
> 
> Don't cahnge the sizes of other buttons but only of the ones that are the odd one (Login and Signup)

---

### Prompt 25: Fixing Visual Size Disparity
> Now this has happened. fix it

---

### Prompt 26: Reviews Section Implementation
> Now we will proceed with the reviews section inside the home page.
> 
> Requirement:
> - first write and H2 saying "What Our Customers Are Saying"
> - Then a p with "Real reviews from satisfied breakfast lovers." but font-size: 1.3rem and grey color
> - Then make three equal size square boxes with yellow backgorund
> - Then in each of the box first insert a quotation mark svg and make it horzontally centered. Svg is in public\icons\quotation.svg
> - Then after that write a review
> - Then a horizontal separation line
> - Then for one review 4 starts filled (public\icons\star_filled.png) and one empty (public\icons\star_unfilled.png) . Then for the other two reviews 5 full filled stars (public\icons\star_filled.png)
> - Then after that write the name of the person who gave review (write names of celebrities for now).
> - Then below the reservation cards put a button with orange outline and no fill color and orange text color with text read more reviews

---

### Prompt 27: Reviews Card Background & Typography Customization
> rgb(252, 229, 151) give this color to the review cards
> 
> Make the review text grey and its font style sans adn italic

---

### Prompt 28: Expandable Hover Footer Implementation
> Make an expandable footer.
> 
> Initially it should occupy a little height and full width at the bottom with an arrow up icon on its top at the center.
> 
> Upon hovering the exapndable footer it should expand upwards and take about 30 vh from bottom
> 
>  Currently put somethin in the footer. Later on I will tell what exactly to place in it

---

### Prompt 29: Menu Page Initial Layout Requirements
> Now look into the following folder and help me design it:
> 
> app\menu\page.js
> 
> Requirements:
> - Keep width of all the containers in this section the same as in home and aligh them centered by using margin-x auto.
> - Menu heading aligned to teh left with a horizontal bar below it.
> - a sub-navbar below the heading containing the following:
>   - Breakfast
>   - Desserts
>   - Beverages
>   - An empty cart icon (public\icons\cart_empty.png) which changes to full cart (public\icons\cart.png).
>   Make this sub-navbar sticky.
> - Then add an image (public\banner-images\breakfast.png)
> - Do this and then I will tell you what to do further

---

### Prompt 30: Centered Sub-Navbar & Full Width Buttons Layout
> Keep the sub navbar centered with the tems inside it justified betweem and width of the buttons Breakfast, Desserts and beverages full

---

### Prompt 31: Sub-Navbar Button Selected & Unselected Styles
> make the backgorund of the selected sub-navbar button to be rgb(178, 90, 104) and remove the text-deooration like the underline. The unselected button should have text black but once selected and background becomes rgb(178, 90, 104) then the text of the selected button should become white

---

### Prompt 32: Slide-in Right Cart Drawer & Cart Icon State Fix
> One bug I have found is:
> - upon clicking the cart it becomes full.
> - it shouldn;t be like that.
> - Cart should become full once an item is added to it. Although adding item functionality will implemented later on.
> - Currently on clicking empty cart a cart like a card should open sliding in from the right side yet stick with the right boundary of the page

---

### Prompt 33: Cart Drawer Bottom Margin
> give a margin from bottom to the cart card

---

### Prompt 34: Breakfast Section Cards & Categories Setup
> Now let's work with the Breakfast section.
> 
> for all cards common properties:
> - button (add to basket with bg-color rgb(178, 90, 104) and text black)
> - item card bg-color: #f1cacf, on hover: #e8b3b8
> 
> make categories:
> 1. Sweet Breakfast
> i. pancake
> Rs. 300
> image: public\menu-items\breakfast\hot-breakfast\pancake.png
> 
> ii. Crepes
> Rs. 300
> image: public\menu-items\breakfast\hot-breakfast\crepes.png
> 
> iii. Waffle
> Rs. 300
> image: public\menu-items\breakfast\hot-breakfast\waffle.png
> 
> iv. French Toast
> Rs. 300
> image: public\menu-items\breakfast\hot-breakfast\frenchtoast.png
> 
> 2. Savory Breakfast
> i. Eggs and Toast
> Rs. 250
> image: public\menu-items\breakfast\savory\egg_and_toast.png
> 
> ii. Breakfast Sandwich
> Rs. 350
> image: public\menu-items\breakfast\savory\breakfast_sandwich.png
> 
> iii. Panini
> Rs. 200
> image: public\menu-items\breakfast\savory\panini.png
> 
> iv. Vegetable Omlette Toast
> Rs. 320
> image: public\menu-items\breakfast\savory\vegetable_omelette_toast.png
> 
> v. Breakfast Burrito
> Rs. 380
> image: public\menu-items\breakfast\savory\breakfast_burrito.png
> 
> 3. Healthy
> i. Oat Meal
> Rs. 250
> image: public\menu-items\breakfast\healthy\oatmeal.png
> 
> ii. Salad Bowl
> Rs. 320
> image: public\menu-items\breakfast\healthy\salad_bowl.png
> 
> iii. Caprese Salad
> Rs. 300
> image: public\menu-items\breakfast\healthy\caprese_salad.png
> 
> iv. Spinach Omlette
> Rs. 280
> image: public\menu-items\breakfast\healthy\spinach_omlete.png

---

### Prompt 35: Remove Filtering, Add Smooth Scroll & Remove Numbering
> first of all remove the filter functionality and only place simple buttons for each category as they are now. On cliking the type of breakfast it scrolls down to that type.
> 
> Also remove the numbering beside each type of breakfast

---

### Prompt 36: Sticky Category Bar & Sub-Navbar Theme Styling
> also make the container of these buttons sticky and for the coloring schema use the same as used for the sub-navbar

---

### Prompt 37: Reservation Page Initial Setup
> now lets start with the reservation page. Make the reservation page as per the application built till now.

---

### Prompt 38: Reservation Page Customizations & Layout Refinement
> - first of all no numer of guests selection should be there
> - for date an input field shoul be there clicking which opens calendar with the same theme as the cafe
> - for time again an input field should be ther on clicking which a small window with counter for hour and and minutes should be showsn.
> - all of these things should be made while keeping in view the scheme the cafe.
> - remove the calendar icon beside Select Details and make select details golden in color
> - remove the map icon edie interactive plan and make this text golden
> - either remove the tilted table photos or make them straight
> - remove the sparkling icon beside complete table booking text inside the button

---

### Prompt 39: Remove Print Ticket Option
> also remove the print ticket option

---

### Prompt 40: Table Deselection Feature
> in the app/reservation/page.js user should be able to deselect the table after selecting it by click

---

### Prompt 41: Contact Us Page Template & Layout Design
> now lets work with the contact us section in:
> 
> app/contact/page.js
> 
> Design the general template of the contact us page containing:
> - Contact us title
> - A form with:
>    - Name input
>    - Email input
>    - Rate your experience with stars input
>    - comments input
>    - submit button
> - Contact information containing:
>    - email of the club
>    - phone number of the club
> - locations of cafe
>    - Shimla Hill Abbottabd
>       - description (like Food with beautiful scenery)
>    - Nathiagali Abbottabd
>       - description
>    - F-6 Islamabad
>       - description
> - Follow Us containing 
>    - instagram icon
>    - facebook icon
>    - twitter icon
>    - youtube icon
>    - linkedin icon

---

### Prompt 43: Tailwind Property Conflict Resolution in ContactForm
> Explain what this problem is and help me fix it: 'bg-amber-400' applies the same CSS properties as 'active:bg-amber-600'. @[d:\Seecs\FlyRank AI Internship\AI Frontend Engineering\projects\project2\breakfast-club\components\contact\ContactForm.js:L269]

---

### Prompt 44: Firebase Database Integration & Requirements
> Now for the database I have decided to us firebase.
> 
> Objective: 
> - to store the user once signed up
> - user can also add some foods to favourites so that any time they can lookup into the favourites and order if they want.
> - Each user have points and can use to get discount on food items
> - Orders are also saved containing information such as:
>   - order details
>   - personal infrmation of the user like name, address etc.
> - Also suggest from your part what more to do considering how the application is build till now

---

### Prompt 45: Environment Variables Setup Request
> make a basic .env  and .env.local structure

---

### Prompt 46: Firebase Environment Binding & Backend Completion Instructions
> I have entered all the required detals in .env and .env.local now bind it with the project properly and tell me what to do to complete the backend process

---

### Prompt 47: Firebase Realtime Database Signup Troubleshooting
> Currently there is some problem. Although my informaiton is being retained but when i signup my profile is not being added to real-time database in firebase

---

### Prompt 48: Switch to Firebase Realtime Database Configuration
> chilled out. but why to look in firestore. I want to work with the firebase real-time database. Configure the app accoridngly

---

### Prompt 49: Backend Routes for Reservations, Feedback & Live Reviews
> Ok everyhings working fine.
> 
> Now I want you to connect the reservations page with the backend.
> 
> Make a route to the firebase to store the reservation details of the user once he/she makes the reservation from the app.
> 
> Make a route to the firebase to store the feedback details of the user once he/she gives feedback from the contact us page and also add them to the reviews.
> 
> Also make a route for the reviews of the app/cafe so that they can be fetched from the database to show to the users on the reviews page.

---

### Prompt 50: Logged-in Hero Greeting & Reviews Pagination
> once logged in instead of the buttons login and signuo in hero section there should be shown the name of the user "Welcome, [user's name]!"
> 
> also in the reviews section app/review show initially only three reviews with load more reviews button. upon clicking that button more reviews will get loaded from database

---

### Prompt 51: Review Section Collapse Button
> also add the button of collapse for the review section

---

### Prompt 52: Removing the redundant feedback table and also removing the write a review button from the reviews tab.
> There are some changes to make:
> - There is no need of having both reviews and feedbacks in the database simultaneously because it is redundant.
> - I want you to remove the feedbacks table from the database and kep only the reviews table in the database.
> - Also remove write a review option in the reviews tab in app/reviews.
> - The feeback provided on the contact us page is actually the review. So, once auser submits a feeback, put that into the reviews table in database and then do the fetching thing for displaying the reviews on the review tab.

---