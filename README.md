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
- Manage automobile dealership 
- Tracks inventory, sales, and services with microservices
- Uses RESTful API Django in the back-end
- React in the front-end to display data and allow for user interaction

## Installation

Navigate to the desired directory from your terminal and use git to clone this repository into your computer (Replace the "repository link" with the actual link to the repository).

```
$ git clone <repository link>
```

Install Docker desktop from https://www.docker.com and start the Docker application. Navigate into the **project directory** and run the following commands in your terminal.

```
docker volume create beta-data
docker-compose build
docker-compose up
```
**Note:** When running `docker-compose up` on macOS, you will see a warning about an environment variable name `OS` being missing. **You can safely ignore this.**

Once all the containers are up and running in your Docker desktop, you can navigate to http://localhost:3000/ in your browser to access your application.

## Inventory microservice

### Overview

### Manufacturers 
You can access the manufacturer endpoints at the following URLs.
| Action | Method | URL | View Function |
| :--- | :--- | :--- | :--- |
| List manufacturers | GET | `http://localhost:8100/api/manufacturers/` | `api_manufacturers` |
| Create a manufacturer | POST | `http://localhost:8100/api/manufacturers/` | `api_manufacturers` |
| Get a specific manufacturer | GET | `http://localhost:8100/api/manufacturers/:id/` | `api_manufacturer` |
| Update a specific manufacturer | PUT | `http://localhost:8100/api/manufacturers/:id/` | `api_manufacturer` |
| Delete a specific manufacturer | DELETE | `http://localhost:8100/api/manufacturers/:id/` | `api_manufacturer`|

### Vehicle Models 
You can access the vehicle model endpoints at the following URLs.
| Action | Method | URL |
| :---         | :---    | :---          |
| List vehicle models | GET | `http://localhost:8100/api/models/` |
| Create a vehicle model | POST | `http://localhost:8100/api/models/` |
| Get a specific vehicle model | GET | `http://localhost:8100/api/models/:id/` |
| Update a specific specific vehicle model | PUT | `http://localhost:8100/api/models/:id/` |
| Delete a specific vehicle model | DELETE | `http://localhost:8100/api/models/:id/` |

### Automobile Information 
You can access the automobile endpoints at the following URLs.
| Action | Method | URL |
| :---         | :---    | :---          |
| List automobiles | GET | `http://localhost:8100/api/automobiles/` |
| Create an automobile | POST | `http://localhost:8100/api/automobiles/` |
| Get a specific automobile | GET | `http://localhost:8100/api/automobiles/:vin/` |
| Update a specific specific automobile | PUT | `http://localhost:8100/api/automobiles/:vin/` |
| Delete a specific automobile | DELETE | `http://localhost:8100/api/automobiles/:vin/` |

## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.
