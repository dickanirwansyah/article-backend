create table appuser(
     id int AUTO_INCREMENT primary key,
     name VARCHAR(200),
     email VARCHAR(200),
     password VARCHAR(250),
     status VARCHAR(20),
     is_deletable VARCHAR(20),
     unique(email)
);

insert into appuser(name, email,password,status,is_deletable) values ('Admin', 'admin@admin.com', 'admin', 'true', 'false');

create table category(
     id int AUTO_INCREMENT primary key,
     name VARCHAR(100)
);

create table article(
     id int primary key AUTO_INCREMENT,
     title VARCHAR(255) not null,
     content longtext not null,
     category_id int not null,
     publication_date date,
     article_status VARCHAR(100)
);