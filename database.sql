create database delivereat;

create table transaction (
  id serial primary key,
  order_time timestamp NOT NULL
)

create table menu (
  id serial,
  item_name varchar(50) not null,
  item_price numeric(5, 2),
  primary key (id)
);

create table basket (
  id serial primary key,
  transaction_id int,
  menu_id int,
  quantity smallint not null,
  foreign key (transaction_id) references transaction(id),
  foreign key (menu_id) references menu (id)
)

alter table menu add column image varchar(50)

insert into menu (id, item_name, image, item_price) values (1, 'chilli squid', 'squid.png', 6.75);
insert into menu (id, item_name, image, item_price) values (2, 'pulled pork qyoza', 'gyoza.png', 5.95);
insert into menu (id, item_name, image, item_price) values (3, 'bbq beef steamed hirata', 'hirata.png', 6.55);
insert into menu (id, item_name, image, item_price) values (4, 'chicken ramen', 'ramen.png', 9.95);
insert into menu (id, item_name, image, item_price) values (5, 'yaki udon', 'udon.png', 9.95);
insert into menu (id, item_name, image, item_price) values (6, 'chicken katsu curry', 'curry.png', 10.75);
alter sequence menu_id_seq restart with 7 increment by 1;