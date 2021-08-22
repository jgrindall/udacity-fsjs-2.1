alter table order_products
    drop constraint order_products_order_id;

alter table order_products
    drop constraint order_products_product_id;

alter table orders
    drop constraint orders_user_id;
