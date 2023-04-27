-- create database Sgroup
-- use Sgroup

CREATE TABLE users(
    id int AUTO_INCREMENT PRIMARY KEY,
    username varchar(255),
    password varchar(255),
    salt varchar(255),
    name varchar(255),
    age int unsigned,
    gender boolean,
    email varchar(255),
    unique(username),
 );
 