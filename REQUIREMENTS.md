# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

## Users

1. Create a new user

[POST] `/create_user`

```bash
{
"first_name": <User First Name>,
"last_name": <User Last Name>,
"username": <User Username>,
"password": <User Password>
}
```

Successful Response:

```bash
  {
    "username": {
        "id": <user id>,
        "username": <username>,
        "first_name": <user first name>,
        "last_name": <user last name>
    },
    "token": <generated token that will be used for authentication>
}
```

2. Update current user

[POST] `/user/update` [token required]

```bash
{
    "username": <Username to change Its params>,
    "first_name"?: <New First Name>,
    "lastname"?: <New Second Name>,
    "password"?: <New Password>
}
Note: Parameters appended with ? are optional, at least one of them are nessasery to complete the action.
```

Successful Response:

```bash
{
    "username": <username>,
    "first_name": <new first name>,
    "last_name": <new last name>
}
```

3. Get all users

[GET] `/users` [token required]

Successful Response:

```bash
[
    {
        "id": <user id>,
        "username": <user name>,
        "first_name": <user first name>,
        "last_name": <user last name>
    }
]
```

4. Get a specific user by its id

[GET] `/user/<User ID>` [token required]

Successful Response:

```bash
{
    "id": <user id>,
    "username": <user name>,
    "first_name": <user first name>,
    "last_name": <user last name>
}
```

5. Delete a user

[DELETE] `/user/delete` [token required]

```bash
{
    "username": <username to be deleted>
}
```

Successful Response:

```bash
{
    "username": <Deleted username>,
    "first_name": <first name>,
    "last_name": <last name>
}
```

## Products

1. Create a new product

[POST] `/create_product` [token required]

```bash
{
    "name": <Product name>,
    "price": <product price>,
    "category": <product category>
}
```

Successful Response:

```bash
{
    "name": <Product name>,
    "price": <product price>,
    "category": <product category>
}
```

- Create a new product
  app.get("/products", listProducts);
  app.post("/create_product", create);
  app.get("/product/:id", show);
  app.post("/product/:id/update", update);
  app.delete('/product/:id/delete', delProd)

```

```
