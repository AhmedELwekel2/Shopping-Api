create table users (
 id SERIAL PRIMARY KEY, 
 username varchar NOT NULL ,
 firstname varchar NOT NULL,
 lastname varchar NOT NULL,
 password_digest varchar  NOT NULL 
);
