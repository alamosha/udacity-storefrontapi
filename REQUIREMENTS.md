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
    "category": <product category id>
}
```

Successful Response:

```bash
{
    "name": <Product name>,
    "price": <product price>,
    "category": <product category id>
}
```

2. List all products
   [GET] `/products`

Successful Response:

```bash
[
    {
        "id": <Product id>,
        "name": <Product name>,
        "price": <Product price>,
        "category": <Product category>
    },
]
```

4. Get a specific product by its id
   [GET] `/product/<product id>`

Successful Response:

```bash
{
    "id": <Product id>,
    "name": <Product name>,
    "price": <Product price>,
    "category_id": <Product category id>
}
```

5. Update a specific product
   [POST] `/product/<product id>/update` [token required]

```bash
{
    "name"?: <new product name>,
    "category"?: <new product category id>,
    "price"?: <new price>
}
Note: Parameters appended with ? are optional, at least one of them are nessasery to complete the action.
```

Successful Response:

```bash
{
    "id": <product id>,
    "name": <new product name>,
    "price": <new price>,
    "category_id": <new product category id>
}
```

6. Delete a product
   [POST] `/product/<product id>/delete` [token required]

Successful Response:

```bash
{
    "name": <Product name>
}
```

## Orders

1. Create a new order
   [POST] `/create_order` [token required]

```bash
{
    "user_id": <username id>,
    "product_id": <product id>,
    "quantity": <quantity for this product>
}
```

Successful Response:

```bash
{
    "id": <item id>,
    "product_id": <product id>,
    "order_id": <order id>,
    "quantity": <quantity>
}
```

2. List all orders
   [GET] `/orders` [token required]

Successful Response

```bash
[
    {
        "id": <order id>,
        "user_id": <user id>,
        "username": <username>,
        "order_status": <order status>
    },
]
```

3. List an order by its id
   [GET] `/order/<order id>` [token required]

Successful Response

```bash
[
    {
        "id": <item id>,
        "order_id": <order id>,
        "user_id": <user id>,
        "username": <username>,
        "product_id": <product id>,
        "product_name": <product name>,
        "quantity": <item quantity>,
        "order_status": <order status>
    }
]
```

4. Add items to an order
   [POST] `/order/<order id>/add` [token required]

```bash
{
    "product_id": <product id to add to order>,
    "quantity": <quantity>
}
```

Successful Response

```bash
{
    "id": <item id>,
    "product_id": <product id>,
    "order_id": <order id>,
    "quantity": <item quantity>
}
```

5. Edit item inside an order
   [POST] `/order/<order id>/edit` [token required]

```bash
{
    "product_id": <product id>,
    "id": <item id>,
    "quantity": <item new quantity>
}
```

Successful Response

```bash
{
    "id": <item id>,
    "product_id": <product id>,
    "order_id": <order id>,
    "quantity": <item new quantity>
}
```

6. Delete an item from order
   [DELETE] `/order/<item id>/delete_item` [token required]

Successful Response

```bash
{
    "id": <deleted item id>,
    "product_id": <product id>,
    "order_id": <order id>,
    "quantity": <quantity>
}
```

7. Delete a whole order
   [DELETE] `/order/4/delete_order` [token required]

Successful Response

```bash
{
    "id": <order id>,
    "user_id": <user id>,
    "status": <status id>
}
```

#### Product Categories

1. List all categories
   [GET] `/categories`

Successful Response

```bash
[
    {
        "id": <Category id>,
        "category_name": <Category name>
    }
]
```

2. List one category by id
   [GET] `/category/<category id>`

Successful Response

```bash
{
    "id": <Category id>,
    "category_name": <category name>
}
```

3. Update Category by id
   [POST] `/category/<category id>/update`

```bash
{
    "category_name": <New Category Name>
}
```

Successful Response

```bash
{
    "id": <Category id>,
    "category_name": <New Category Name>
}
```

4. Create a new category
   [POST] `/create_category`

```bash
{
    "category_name": <new category name>
}
```

Successful Response

```bash
{
    "id": 5,
    "category_name": <new category name>
}
```

5. Delete category
   [DELETE] `/category/<category id>/delete`

Successful Response

```bash
{
    "id": <deleted category id>,
    "category_name": <deleted category name>
}
```

#### Order Status

Order status are already defined as following:
<1> Active
<2> Completed

## Database Schema

1. users

```bash
    id: SERIAL PRIMARY KEY,
    username: VARCHAR(50) UNIQUE,
    first_name: VARCHAR(100),
    last_name: VARCHAR(100),
    password: VARCHAR(255)
```

2. orders

```bash
    id: SERIAL PRIMARY KEY,
    user_id: INT REFERENCES users(id),
    status: INT REFERENCES order_status(id)

    order_status table:
    id: SERIAL PRIMARY KEY,
    status_name: VARCHAR(50)

    order_products table: `used for many to many relations`
    id: SERIAL PRIMARY KEY,
    product_id: INT REFERENCES products(id),
    order_id: INT REFERENCES orders(id),
    quantity: INT
```

3. products

```bash
    id: SERIAL PRIMARY KEY,
    name: VARCHAR(100),
    price: INT,
    category_id: INT REFERENCES categories(id)

    categories table:
    id SERIAL: PRIMARY KEY,
    category_name: VARCHAR(100)
```
