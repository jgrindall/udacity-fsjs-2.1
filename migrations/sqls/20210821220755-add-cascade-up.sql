alter table order_products
    add constraint order_products_order_id
        foreign key (order_id)
            references orders(id);

alter table order_products
    add constraint order_products_product_id
        foreign key (product_id)
            references products(id);


alter table orders
    add constraint orders_user_id
        foreign key (user_id)
            references users(id);

