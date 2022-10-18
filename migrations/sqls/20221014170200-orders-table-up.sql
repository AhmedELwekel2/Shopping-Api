
create type status as enum ('active','complete');
create table orders (
     order_id serial primary key , 
     
     user_id integer , 
     status status NOT NULL ,
     FOREIGN  key (user_id) REFERENCES users(id)  ON DELETE CASCADE ON UPDATE CASCADE



 );
