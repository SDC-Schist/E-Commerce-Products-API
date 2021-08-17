CREATE DATABASE productsDB;

USE productsDB;

CREATE TABLE products (
  _id int PRIMARY KEY
  _ProductName text,
  _Slogan text,
  _ProductDescription text,
  _Category text,
  _Price int
);

CREATE TABLE features (
  _FeatureID int PRIMARY KEY,
  _Features text,
  _Value text
)

CREATE TABLE productFeatureRealation (
  _ProductID int,
  _FeatureID int
)

CREATE TABLE relatedProducts (
  _id int PRIMARY KEY,
  _OriginProduct int
);