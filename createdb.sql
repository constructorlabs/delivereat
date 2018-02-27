CREATE DATABASE delivereat OWNER dmitri;

-- create new connection to delivereat db and run code below
create table menu (
	id serial,
	item_name varchar(50) not null,
	price numeric(5, 2) not null,
	primary key(id)
);

insert into menu (item_name, price) values ('Five Points IPA', 5.00);
insert into menu (item_name, price) values ('Beavertown Smoked port', 5.50);
insert into menu (item_name, price) values ('Camden Hells', 4.70);
insert into menu (item_name, price) values ('Brewdog Dead Pony', 2.50);
insert into menu (item_name, price) values ('Old Rosy', 3.50);
