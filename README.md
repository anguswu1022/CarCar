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

Once all the containers are up and running in your Docker desktop, make and run migrations. Do **not** stop the services.

```
docker exec -it <<api-container-name>> bash
python manage.py makemigrations
python manage.py migrate
```

Restart the poller service using Docker desktop. You can navigate to http://localhost:3000/ in your browser to access your application.

## Inventory microservice

### Overview
The Inventory microservice provides users with the ability to manage the inventory of vehicles within a dealership. Through the API, users can create and/or update `Manufacturer`, `VehicleModel`, and `Automobile` objects, delete existing records, as well as listing and viewing the details for the objects in the inventory.

### Models

`Manufacturer`
* name

`VehicleModel`
* name
* picture_url
* manufacturer - A foreign key to Manufacturer

`Automobile`
* color
* year
* vin
* model - A foreign key to VehicleModel

### RESTful API (Port 8100):
### Manufacturers 
You can access the manufacturer endpoints at the following URLs.
| Action | Method | URL | View Function |
| :--- | :--- | :--- | :--- |
| List manufacturers | GET | `http://localhost:8100/api/manufacturers/` | `api_manufacturers` |
| Create a manufacturer | POST | `http://localhost:8100/api/manufacturers/` | `api_manufacturers` |
| Get a specific manufacturer | GET | `http://localhost:8100/api/manufacturers/:id/` | `api_manufacturer` |
| Update a specific manufacturer | PUT | `http://localhost:8100/api/manufacturers/:id/` | `api_manufacturer` |
| Delete a specific manufacturer | DELETE | `http://localhost:8100/api/manufacturers/:id/` | `api_manufacturer`|

<details>
<summary><strong>Creating and updating a manufacturer input</strong></summary>

##### Requires only the manufacturer name
```
{
  "name": "Chrysler"
}
```
</details>
<details>
<summary><strong>Creating, getting, and updating a single manufacturer output</strong></summary>

```
{
  "href": "/api/manufacturers/1/",
  "id": 1,
  "name": "Chrysler"
}
```
</details>
<details>
<summary><strong>List of manufacturers output</strong></summary>

```
{
  "manufacturers": [
    {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  ]
}
```
</details>

### Vehicle Models 
You can access the vehicle model endpoints at the following URLs.
| Action | Method | URL | View Function |
| :--- | :--- | :--- | :--- |
| List vehicle models | GET | `http://localhost:8100/api/models/` | `api_vehicle_models` |
| Create a vehicle model | POST | `http://localhost:8100/api/models/` | `api_vehicle_models` |
| Get a specific vehicle model | GET | `http://localhost:8100/api/models/:id/` | `api_vehicle_model` |
| Update a specific specific vehicle model | PUT | `http://localhost:8100/api/models/:id/` | `api_vehicle_model` |
| Delete a specific vehicle model | DELETE | `http://localhost:8100/api/models/:id/` | `api_vehicle_model` |

<details>
<summary><strong>Creating and updating a vehicle model input</strong></summary>

##### Requires a model name, URL of an image, and manufacturer id
```
{
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
  "manufacturer_id": 1
}
```
</details>
<details>
<summary><strong>Updating vehicle model input</strong></summary>


##### Can take the name and/or the picture URL
```
{
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg"
}
```
</details>
<details>
<summary><strong>Getting, creating, or updating a vehicle model output</strong></summary>

```
{
  "href": "/api/models/1/",
  "id": 1,
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
  "manufacturer": {
    "href": "/api/manufacturers/1/",
    "id": 1,
    "name": "Daimler-Chrysler"
  }
}
```
</details>
<details>
<summary><strong>List of vehicle models output</strong></summary>

```
{
  "models": [
    {
      "href": "/api/models/1/",
      "id": 1,
      "name": "Sebring",
      "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
      "manufacturer": {
        "href": "/api/manufacturers/1/",
        "id": 1,
        "name": "Daimler-Chrysler"
      }
    }
  ]
}
```
</details>

### Automobile Information 
You can access the automobile endpoints at the following URLs.
| Action | Method | URL | View Function |
| :--- | :--- | :--- | :--- |
| List automobiles | GET | `http://localhost:8100/api/automobiles/` | `api_automobiles` |
| Create an automobile | POST | `http://localhost:8100/api/automobiles/` | `api_automobiles` |
| Get a specific automobile | GET | `http://localhost:8100/api/automobiles/:vin/` | `api_automobile` |
| Update a specific specific automobile | PUT | `http://localhost:8100/api/automobiles/:vin/` | `api_automobile` |
| Delete a specific automobile | DELETE | `http://localhost:8100/api/automobiles/:vin/` | `api_automobile` |

<details>
<summary><strong>Creating an automobile Input</strong></summary>

##### Create with the automobile color, year, VIN, and id for vehicle model
```
{
  "color": "red",
  "year": 2012,
  "vin": "1C3CC5FB2AN120174",
  "model_id": 1
}
```
</details>
<details>
<summary><strong>Details for specific automobile output</strong></summary>


##### Queried by its VIN
```
{
  "href": "/api/automobiles/1C3CC5FB2AN120174/",
  "id": 1,
  "color": "yellow",
  "year": 2013,
  "vin": "1C3CC5FB2AN120174",
  "model": {
    "href": "/api/models/1/",
    "id": 1,
    "name": "Sebring",
    "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
    "manufacturer": {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  }
}
```
</details>
<details>
<summary><strong>Updating the automobile input</strong></summary>

##### Can take the color and/or year of an automobile
```
{
  "color": "red",
  "year": 2012
}
```
</details>
<details>
<summary><strong>List of Automobiles output</strong></summary>

##### Returns dictionary with key "autos" set to list of automobile information
```
{
  "autos": [
    {
      "href": "/api/automobiles/1C3CC5FB2AN120174/",
      "id": 1,
      "color": "yellow",
      "year": 2013,
      "vin": "1C3CC5FB2AN120174",
      "model": {
        "href": "/api/models/1/",
        "id": 1,
        "name": "Sebring",
        "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
        "manufacturer": {
          "href": "/api/manufacturers/1/",
          "id": 1,
          "name": "Daimler-Chrysler"
        }
      }
    }
  ]
}
```
</details>

## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.
