-- create database Sgroup
-- use Sgroup
CREATE TABLE users(
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      gender boolean NOT NULL,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      salt VARCHAR(255),
      age int NOT NULL,
      passwordResetToken VARCHAR(255),
      passwordResetExpires VARCHAR(255),
      createdAt datetime,
      createBy int,
)
CREATE TABLE poll(
      poll_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      user_id int NOT NULL,
      question VARCHAR(255) NOT NULL,
      createdAt datetime,
      Foreign key (user_id) references users(id),
      
)
CREATE TABLE option(
      option_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      poll_id int NOT NULL,
      option_text VARCHAR(255) NOT NULL,
      Foreign key (poll_id) references poll(poll_id) ON DELETE CASCADE,
)
CREATE TABLE votes(
      vote_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      option_id int NOT NULL,
      user_id int NOT NULL,
      Foreign key (option_id) references option(option_id),
      Foreign key (user_id) references users(id),
)
CREATE TABLE role(
      role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      role_name VARCHAR(255) NOT NULL,
)
CREATE TABLE user_role(
      user_role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      user_id int NOT NULL,
      role_id int NOT NULL,
      Foreign key (user_id) references users(id),
      Foreign key (role_id) references role(role_id),
)
create table permissions(
      permission_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      permission_name VARCHAR(255) NOT NULL,
)
create table role_permission(
      permission_role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      role_id int NOT NULL,
      permission_id int NOT NULL,
      Foreign key (role_id) references role(role_id),
      Foreign key (permission_id) references permissions(permission_id),
)
