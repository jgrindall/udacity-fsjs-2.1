alter table order_products
    drop constraint order_products_order_id_fkey;

alter table order_products
    drop constraint order_products_product_id_fkey;

alter table orders
    drop constraint orders_user_id_fkey;
