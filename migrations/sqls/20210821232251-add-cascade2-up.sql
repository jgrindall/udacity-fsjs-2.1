alter table order_products
    drop constraint order_products_order_id;

alter table order_products
    drop constraint order_products_product_id;

alter table orders
    drop constraint orders_user_id;



alter table order_products
    add constraint order_products_order_id
        foreign key (order_id)
            references orders(id) on delete cascade;

alter table order_products
    add constraint order_products_product_id
        foreign key (product_id)
            references products(id) on delete cascade;


alter table orders
    add constraint orders_user_id
        foreign key (user_id)
            references users(id) on delete cascade;

