INSERT INTO menu VALUES (1,'Marinara','Tomato sauce, garlic, basil, oregano, olive oil (v)',8 );
INSERT INTO menu VALUES (2,'Margherita','Tomato sauce, fior di latte, basil, olive oil (v)',9 );
INSERT INTO menu VALUES (3,'Funghi','White sauce, mushrooms, parmesan, aged mozzarella, roasted garlic, arugula (v)', 12);
INSERT INTO menu VALUES (4,'Carciofi','Tomato sauce, artichokes, pancetta, cherry tomatoes, parmesan, aged mozzarella, basil',14 );
INSERT INTO menu VALUES (5,'Calabrese','Tomato sauce, soppressata, fior di latte, nicoise olives, oregano',14 );

ALTER SEQUENCE menu_id_seq RESTART WITH 6 INCREMENT BY 1;




INSERT INTO customer (id,email,name, street_address, town, post_code, telephone,delivery_info)
VALUES (1,'phil@berryman.org.uk','Phil B','Flat 1, 12 Smyrna Road', 'London', 'NW6 4LY', '07726 002626', 'Buzzer 1')



