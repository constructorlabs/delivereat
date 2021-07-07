DROP TABLE IF EXISTS customer;
DROP TABLE IF EXISTS menu;
DROP TABLE IF EXISTS transaction;
DROP TABLE IF EXISTS transaction_item;



CREATE TABLE public.customer (
    id serial,
    email character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    company_name character varying(255),
    street_address character varying(100) NOT NULL,
    town character varying(60) NOT NULL,
    post_code character varying(9) NOT NULL,
    telephone character varying(15) NOT NULL,
    delivery_info character varying(255) NOT NULL,
    admin boolean
);


CREATE TABLE public.menu (
    id serial,
    name character varying(50) NOT NULL,
    ingredients character varying(200) NOT NULL,
    price numeric(5,2) NOT NULL
);


CREATE TABLE public.transaction (
    id serial,
    customer_id integer NOT NULL,
    date_time timestamp without time zone NOT NULL,
    status character varying(20) NOT NULL
);


CREATE TABLE public.transaction_item (
    id serial,
    transaction_id integer NOT NULL,
    menu_id integer NOT NULL,
    quantity integer NOT NULL
);

INSERT INTO menu (id, name, ingredients, price) 
  VALUES 
    (1, 'Marinara', 'Tomato sauce, garlic, basil, oregano, olive oil (v)',8.00),
    (2, 'Margherita', 	'Tomato sauce, fior di latte, basil, olive oil (v)',9.00),
    (3, 'Funghi',	'White sauce, mushrooms, parmesan, aged mozzarella, roasted garlic, arugula (v)',12.00),
    (4, 'Carciofi',	'Tomato sauce, artichokes, pancetta, cherry tomatoes, parmesan, aged mozzarella, basil',14.00),
    (5, 'Calabrese',	'Tomato sauce, soppressata, fior di latte, nicoise olives, oregano', 14.00)
