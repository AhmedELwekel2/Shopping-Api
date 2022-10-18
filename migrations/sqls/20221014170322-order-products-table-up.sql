 create table order_products(
     order_id   INTEGER NOT NULL REFERENCES orders (order_id),
     product_id INTEGER NOT NULL REFERENCES products (id),
     quantity   INTEGER NOT NULL
 )