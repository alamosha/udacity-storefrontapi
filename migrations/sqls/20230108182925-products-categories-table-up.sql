CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    category_name VARCHAR(100)
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    price INT,
    category_id INT REFERENCES categories(id)
);

INSERT INTO categories (id, category_name) VALUES (1, 'Category 1'), (2, 'Category 2'), (3, 'Category 3');