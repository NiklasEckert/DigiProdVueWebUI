#! /bin/bash

cd DigiProd
mvn clean package spring-boot:repackage
cd ..

docker-compose build
docker-compose up
