create schema if not exists shalomsoft_db
    collate = 'utf8mb4_general_ci'
    character set = 'utf8mb4';

use shalomsoft_db;

create table if not exists users (
    id                 int             auto_increment primary key,
    name               varchar(255)    not null,
    user               varchar(100)    not null unique,
    email              varchar(255)    not null unique,
    password           varchar(255)    not null,
    created_at         timestamp       default current_timestamp,
    updated_at         timestamp       default current_timestamp on update current_timestamp
) engine = InnoDB
  default charset = utf8mb4
  collate = utf8mb4_general_ci;