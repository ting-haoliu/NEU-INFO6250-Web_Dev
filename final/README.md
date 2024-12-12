# Final project - Fake Store
## Description
This multi-user e-commerce website enables users to browse and purchase products, showcasing the integration of modern web technologies and design principles for a seamless shopping experience. The project adheres to the MVC (Model-View-Controller) design pattern, utilizing Express-based Node.js for server-side functionality and Vite with React for dynamic and responsive user interfaces. It also incorporates Service-Oriented Architecture (SOA) with RESTful APIs.

Key features include:
* Product browsing
* Secure user authentication and authorization
* Shopping cart management
* Checkout functionality

## Author
- [@Ting-haoliu](https://github.com/ting-haoliu)

## How to Use
1. Clone the repository to get the source files.
2. Install dependencies by running `npm install` in the project root directory.
3. Build the front-end files using the command `npm run build`.
4. Start the server with `npm start`.
5. Open your browser and navigate to http://localhost:3000 to access the application.

## Server-Side Implementation
### Technologies Used
* **Express**: For server creation and routing.
* **Cookie-parser**: To parse cookies sent with requests.
* **UUID**: To manage user session IDs, acting as tokens for authentication and authorization.

### Features
* **Authentication**: Supports login via username. Example: the username dog has limited permissions (can view products but cannot make purchases).
* **Authorization**: Access to certain resources is protected and requires valid session authentication.
* **Session Management**: Tracks logged-in users, enforces session timeout for enhanced security, and supports simultaneous logins with the same username across devices.
* **Product Management**: Enables viewing and purchasing products.
* **Cart Management**: Allows users to view, update, and remove items from their cart, as well as proceed to checkout.

### API Routes
#### Session
* GET /api/session: Check for an existing session (used when loading the cart page).
* POST /api/session: Create a new session (log in).
* DELETE /api/session: Log out.
#### Products
* GET /api/products: Retrieve the product list (public access).
#### Carts
* GET /api/carts: Retrieve the user’s cart.
* PUT /api/carts/:id: Add an item to the cart.
* PATCH /api/carts/:id: Update the quantity of an item in the cart.
* DELETE /api/carts/:id: Remove an item from the cart.
#### Orders
* POST /api/orders: Create a new order.

## Browser-Side Implementation
### Technologies Used
* **Vite**: For development and production builds of the front-end.
* **React**: For building and rendering the user interface.
### Features
#### Header
The header displays buttons based on the user’s authentication status and permissions:
* Not logged in: Displays a Login button.
* Logged in users: Displays Products, Cart(0), and Logout buttons.
* Username dog: Limited permissions, displaying only the Logout button.

#### Pages
* **Home Page**: Displays the header and different views based on the user’s status and selections. The default view shows the Products page.
* **Products Page**: Lists all products available for purchase. Users can view details and add products to their cart.
* **Cart Page**: Displays the user’s cart. Users can update item quantities, remove items (by setting the quantity to zero or clicking Delete), and proceed to checkout.
* **Login Page**: Allows users to log in.

## License
[MIT License](https://choosealicense.com/licenses/mit/)