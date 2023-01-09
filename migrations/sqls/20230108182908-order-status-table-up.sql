CREATE TABLE order_status (
    id SERIAL PRIMARY KEY,
    status_name VARCHAR(50)
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    status INT REFERENCES order_status(id)
);

INSERT INTO order_status (id, status_name) VALUES (1, 'Active'), (2, 'Completed');