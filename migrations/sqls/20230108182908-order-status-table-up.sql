CREATE TABLE order_status (
    id SERIAL PRIMARY KEY,
    status_name VARCHAR(50)
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    status INT REFERENCES order_status(id)
);