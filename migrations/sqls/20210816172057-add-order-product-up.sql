create table order_products(
                       id SERIAL PRIMARY KEY,
                       quantity int,
                       order_id int references orders(id),
                       product_id int references products(id)
);