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

### RESTful API (Port 8090):
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
<summary><strong>Creating and updating a manufacturer Input</strong></summary>

##### Requires only the manufacturer name
```
{
  "name": "Chrysler"
}
```
</details>
<details>
<summary><strong>Creating, getting, and updating a single manufacturer Output</strong></summary>

```
{
  "href": "/api/manufacturers/1/",
  "id": 1,
  "name": "Chrysler"
}
```
</details>
<details>
<summary><strong>List of manufacturers Output</strong></summary>

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
<summary><strong>Creating and updating a vehicle model Input</strong></summary>

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
<summary><strong>Updating vehicle model Input</strong></summary>


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

## Service microservice

### Overview
The service microservice allows a user to create a new technician, create a new service appointment, view an active pending appointment list, and to see the history of service appointments by VIN number of the vehicle. After creating a technician, it is stored to the database to be later accessed via a drop-down menu when creating an appointment. When creating a new service appointment, it will be saved to the database and accessible in both the Appointment List and the Appointment History. When viewing the list of active and pending appointments, each appointment has a "cancel" and "completed" button along with the relevant appointment information. If the job is completed or canceled, the user can indicate it as such and the appointment will disappear from the list. It should be noted that the appointment will remain in the database and can be accessible in the Appointment History list. Each appointment also has an indicator to display whether or not the customer is a VIP if they purchased the vehicle from the dealership. The Appointment History list allows a user to input a VIN number and view all appointments associated the VIN number regardless of completed or cancelled status.

### Models
`Technician`
  - Name
  - Employee ID

`Appointment`
  - VIN
  - Owner
  - Date
  - Time
  - Technician
  - Reason for appointment
  - Completed (true or false)
  - Canceled (true or false)

### RESTful API (Port 8080):
You can access the service endpoints at the following URLs.

### Technician
| Action | Method | URL | View Function |
| :--- | :--- | :--- | :--- |
| List technicians | GET | `http://localhost:8080/api/technicians/` | `api_technicians` |
| Create a technician | POST | `http://localhost:8080/api/technicians/` | `api_technicians` |
| Get a specific technician | GET | `http://localhost:8080/api/technicians/:id/` | `api_technician` |
| Update a specific specific technician | PUT | `http://localhost:8080/api/technicians/:id/` | `api_technician` |
| Delete a specific technician | DELETE | `http://localhost:8080/api/technicians/:id/` | `api_technician` |

<details>
<summary><strong>Creating and updating a technician model Input</strong></summary>

##### Requires a model name, and employee id
```
{
  "name": "Charizard",
  "employee_id": "11111"
}
```
</details>
<details>
<summary><strong>Getting, creating, or updating a technician model output</strong></summary>

```
{
	"href": "/api/technicians/8/",
	"name": "Squirtle",
	"employee_id": "11111"
}
```
</details>
<details>
<summary><strong>List of vehicle models output</strong></summary>

```
{
	"technicians": [
		{
			"href": "/api/technicians/8/",
			"name": "Squirtle",
			"employee_id": "11111"
		}
	]
}
```
</details>

### Appointment
| Action | Method | URL | View Function |
| :--- | :--- | :--- | :--- |
| List appointments | GET | `http://localhost:8080/api/appointments/` | `api_appointments` |
| Create an appointment | POST | `http://localhost:8080/api/appointments/` | `api_appointments` |
| Get a specific appointment | GET | `http://localhost:8080/api/appointments/:id/` | `api_appointment` |
| Update a specific specific appointment | PUT | `http://localhost:8080/api/appointments/:id/` | `api_appointment` |
| Delete a specific appointment | DELETE | `http://localhost:8080/api/appointments/:id/` | `api_appointment` |

<details>
<summary><strong>Creating and updating an appointment model Input</strong></summary>

##### Requires a VIN, owner, date, time, technician, and reason
```
{
  "vin": "00000000000055555",
  "owner": "Blastoise",
  "date": "2023-10-10",
  "time": "16:00",
	"technician": "Alfalfa",
	"reason": "Tire rotation"
}
```
</details>
<details>
<summary><strong>Getting, creating, or updating an appointment model output</strong></summary>

```
{
	"href": "/api/appointments/1/",
	"vin": "00000000000055555",
  "owner": "Blastoise",
  "date": "2023-10-10",
  "time": "16:00",
	"technician": "Alfalfa",
	"reason": "Tire rotation"
	"completed": false,
	"canceled": false
}
```
</details>
<details>
<summary><strong>List of vehicle models output</strong></summary>

```
{
	"appointments": [
		{
      "href": "/api/appointments/1/",
      "vin": "00000000000055555",
      "owner": "Blastoise",
      "date": "2023-10-10",
      "time": "16:00",
      "technician": "Alfalfa",
      "reason": "Tire rotation"
      "completed": false,
      "canceled": false
    },
	]
}
```
</details>

## Sales microservice

Explain your models and integration with the inventory
microservice, here.
