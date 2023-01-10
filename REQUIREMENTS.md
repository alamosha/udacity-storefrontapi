# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Users

- Create a new user: - [POST] `/create_user`
  Parameters:

  ```bash
  {
  "first_name": [User First Name],
  "last_name": [User Last Name],
  "username": [User Username],
  "password": [User Password]
  }
  ```

- Update current user: [POST] `/user/update` [token required]
- Get all users [GET] `/users` [token required]
- Get a specific user by its id [GET] `/user/<User ID>` [token required]

#### Products

- Create a new product
  app.get("/products", listProducts);
  app.post("/create_product", create);
  app.get("/product/:id", show);
  app.post("/product/:id/update", update);
  app.delete('/product/:id/delete', delProd)

```

```
