# CarCar

Team:

- Ethan Brown - Service microservice
- Angus Wu - Sales microservice

## Contents

- [Design](#design)
- [Installation](#installation)
- [Inventory Microservice](#inventory-microservice)
- [Service Microservice](#service-microservice)
- [Sales Microservice](#sales-microservice)

## Design

## Installation

Navigate to the desired directory from your terminal and use git to clone this repository into your computer.

```
git clone https://gitlab.com/anguswu1022/project-beta.git
```

Make sure you have Docker desktop installed from https://www.docker.com and run the following commands in your terminal once you have Docker desktop opened:

```
docker volume create beta-data
docker-compose build
docker-compose up
```
**Note:** When running ```docker-compose up``` on macOS, you will see a warning about an environment variable name ```OS``` being missing. **You can safely ignore this.**

Once all the containers are up and running in your Docker desktop, you can navigate to http://localhost:3000/ in your browser to access your application.

## Inventory microservice

Explain inventory models

## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.
