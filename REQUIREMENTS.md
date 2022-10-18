..API Endpoints

.The main EndPoint localhost:3000/

.if you are not signed-up 
 localhost:3000/users/sign-up POST  { username : ,firstname:,lastname:, password : }

. if you are signed-up
localhost:3000/users/sign-in POST  { username : , password : }



.products

. Index /products GET Token Required (set token Authorization', 'Bearer ' + token)
. Create /products POST { name : ,category:,price: } Token Required
. Show /products/id GET Token Required
. Delete /products DELETE Token Required
. DeleteOne /products/id DELETE Token Required
. Read /products/category/category GET Token Required (set token Authorization', 'Bearer ' + token)


.users 

. Index /users GET Token Required (set token Authorization', 'Bearer ' + token)
. Create /users POST { username : ,firstname:,lastname:, password : } Token Required
. Show /users/id GET Token Required
. Delete /users DELETE Token Required
. DeleteOne /users/id DELETE Token Required


.orders

. Index /orders GET Token Required (set token Authorization', 'Bearer ' + token)
. Create /orders POST { products:[{product_id:,quantity:}]  ,user_id:,status:} Token Required
. Read /orders/currentOrder  GET  Token Required (set token Authorization', 'Bearer ' + token)
. Read /orders/completedOrders  GET  Token Required (set token Authorization', 'Bearer ' + token)
. Delete /orders DELETE Token Required
. DeleteOne /orders/id DELETE Token Required


..DATA SHAPES

.Table:users

 id SERIAL PRIMARY KEY,
 username varchar NOT NULL, 
 firstname varchar NOT NULL,
 lastname varchar NOT NULL,
 password_digest varchar  NOT NULL 



.Table:products
    id SERIAL PRIMARY KEY ,
    name varchar NOT NULL,
    price varchar NOT NULL ,
    category varchar NOT NULL 


.table:orders
     order_id serial primary key ,  
     user_id integer , 
     status status NOT NULL ,
     FOREIGN  key (user_id) REFERENCES users(id)  ON DELETE CASCADE ON UPDATE CASCADE


.table:order_products

     order_id   INTEGER NOT NULL REFERENCES orders (order_id),
     product_id INTEGER NOT NULL REFERENCES products (id),
     quantity   INTEGER NOT NULL

