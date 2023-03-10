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

- Application to manage an automobile dealership
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

- name

`VehicleModel`

- name
- picture_url
- manufacturer - Foreign key to `Manufacturer`

`Automobile`

- color
- year
- vin
- model - Foreign key to `VehicleModel`

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
| Update a specific automobile | PUT | `http://localhost:8100/api/automobiles/:vin/` | `api_automobile` |
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

### Overview

The service microservice allows a user to create a new technician, create a new service appointment, view an active pending appointment list, and to see the history of service appointments by VIN number of the vehicle. After creating a technician, it is stored to the database to be later accessed via a drop-down menu when creating an appointment. When creating a new service appointment, it will be saved to the database and accessible in both the Appointment List and the Appointment History. When viewing the list of active and pending appointments, each appointment has a "cancel" and "completed" button along with the relevant appointment information. If the job is completed or canceled, the user can indicate it as such and the appointment will disappear from the list. It should be noted that the appointment will remain in the database and can be accessible in the Appointment History list. Each appointment also has an indicator to display whether or not the customer is a VIP if they purchased the vehicle from the dealership. The Appointment History list allows a user to input a VIN number and view all appointments associated the VIN number regardless of completed or cancelled status. This microservice utilizes a poller to retreive necessary information from the other microservices.

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

| Action                                | Method | URL                                          | View Function     |
| :------------------------------------ | :----- | :------------------------------------------- | :---------------- |
| List technicians                      | GET    | `http://localhost:8080/api/technicians/`     | `api_technicians` |
| Create a technician                   | POST   | `http://localhost:8080/api/technicians/`     | `api_technicians` |
| Get a specific technician             | GET    | `http://localhost:8080/api/technicians/:id/` | `api_technician`  |
| Update a specific specific technician | PUT    | `http://localhost:8080/api/technicians/:id/` | `api_technician`  |
| Delete a specific technician          | DELETE | `http://localhost:8080/api/technicians/:id/` | `api_technician`  |

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

| Action                                 | Method | URL                                           | View Function      |
| :------------------------------------- | :----- | :-------------------------------------------- | :----------------- |
| List appointments                      | GET    | `http://localhost:8080/api/appointments/`     | `api_appointments` |
| Create an appointment                  | POST   | `http://localhost:8080/api/appointments/`     | `api_appointments` |
| Get a specific appointment             | GET    | `http://localhost:8080/api/appointments/:id/` | `api_appointment`  |
| Update a specific specific appointment | PUT    | `http://localhost:8080/api/appointments/:id/` | `api_appointment`  |
| Delete a specific appointment          | DELETE | `http://localhost:8080/api/appointments/:id/` | `api_appointment`  |

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

### Overview

The Sales microservice provides users with the ability to view and manage the aspects of a vehicle sale. Users can utilize the API's capabilities to create, update, list, and delete various objects relating to sales, including the automobiles (`AutomobileVO` objects), sales people (`Sales_Person` objects), customers (`Customer` objects), and sale records (`Sale` objects).

The frontend interface, built with React, offers users access to forms to create new sales people, customers, and sale records. Moreover, the interface provides comprehensive views of all sales records, which list key details such as the sales person, customer, and automobile VIN. Users can filter the sale records by a sale person to monitor their sale performance.

### Poll

The Sales microservice will poll the Inventory microservice for updated `Automobile` data every 5 seconds. The data is used to create and update automobile value objects (`AutomobileVO`).

### Models

`AutomobileVO`

- import_href
- vin

`Sales_Person`

- name
- employee_number

`Customer`

- name
- address
- phone_number

`Sale`

- automobile - Foreign key to `AutomobileVO`
- sales_person - Foreign key to `Sales_Person`
- customer - Foreign key to `Customer`
- price

### RESTful API (Port 8090)

### Sales Person

You can access the sales person endpoints at the following URLs.

| Action                         | Method | URL                                            | View Function       |
| :----------------------------- | :----- | :--------------------------------------------- | :------------------ |
| List sales people              | GET    | `http://localhost:8090/api/sales_persons/`     | `api_sales_persons` |
| Create a sales person          | POST   | `http://localhost:8090/api/sales_persons/`     | `api_sales_persons` |
| Get a specific sales person    | GET    | `http://localhost:8090/api/sales_persons/:id/` | `api_sales_person`  |
| Update a specific sales person | PUT    | `http://localhost:8090/api/sales_persons/:id/` | `api_sales_person`  |
| Delete a specific sales person | DELETE | `http://localhost:8090/api/sales_persons/:id/` | `api_sales_person`  |

<details>
<summary><strong>Creating and updating a sales person input</strong></summary>

##### Requires the name and employee number (either/or for update)

```
{
	"name": "Angus Wu",
	"employee_number": 29325
}
```

</details>
<details>
<summary><strong>Getting a specific sales person output</strong></summary>

```
{
	"name": "Angus Wu",
	"employee_number": "29325"
}
```

</details>
<details>
<summary><strong>List of sales people output</strong></summary>

```
{
	"sales_persons": [
		{
			"name": "Angus Wu",
			"employee_number": "29325"
		}
	]
}
```

</details>
<details>
<summary><strong>Delete sales person output</strong></summary>

```
{
	"Deleted": true
}

```

</details>

### Customer

You can access the customer endpoints at the following URLs.

| Action                     | Method | URL                                        | View Function   |
| :------------------------- | :----- | :----------------------------------------- | :-------------- |
| List customers             | GET    | `http://localhost:8090/api/customers/`     | `api_customers` |
| Create a customer          | POST   | `http://localhost:8090/api/customers/`     | `api_customers` |
| Get a specific customer    | GET    | `http://localhost:8090/api/customers/:id/` | `api_customer`  |
| Update a specific customer | PUT    | `http://localhost:8090/api/customers/:id/` | `api_customer`  |
| Delete a specific customer | DELETE | `http://localhost:8090/api/customers/:id/` | `api_customer`  |

<details>
<summary><strong>Creating and updating a customer input</strong></summary>

##### Requires the name, address, and phone number

```
{
	"name": "Sebastian",
	"address": "5233 Cass St, San Diego, CA",
	"phone_number": "123-456-7890"
}
```

</details>
<details>
<summary><strong>Getting a specific customer output</strong></summary>

```
{
	"id": 1,
	"name": "Sebastian",
	"address": "5233 Cass St, San Diego, CA",
	"phone_number": "123-456-7890"
}
```

</details>
<details>
<summary><strong>List of customers output</strong></summary>

```
{
	"customers": [
		{
			"id": 2,
			"name": "Sebastian",
			"address": "5233 Cass St, San Diego, CA",
			"phone_number": "123-456-7890"
		}
	]
}
```

</details>
<details>
<summary><strong>Delete customer output</strong></summary>

```
{
	"Deleted": true
}

```

</details>

### Sales

You can access the sale endpoints at the following URLs.

| Action                 | Method | URL                                    | View Function |
| :--------------------- | :----- | :------------------------------------- | :------------ |
| List sales             | GET    | `http://localhost:8090/api/sales/`     | `api_sales`   |
| Create a sale          | POST   | `http://localhost:8090/api/sales/`     | `api_sales`   |
| Get a specific sale    | GET    | `http://localhost:8090/api/sales/:id/` | `api_sale`    |
| Delete a specific sale | DELETE | `http://localhost:8090/api/sales/:id/` | `api_sale`    |

<details>
<summary><strong>Creating a sale input</strong></summary>

##### Requires the automobile VIN, sales person employee_number, customer id, and price

```
{
	"automobile": "1C3PO5MN03J129203",
	"sales_person": 29325,
	"customer": 1,
	"price": "73900"
}
```

</details>
<details>
<summary><strong>Getting a specific sale output</strong></summary>

```
{
	"id": 1,
	"price": "73128",
	"automobile": {
		"vin": "1C3CC5FB2AN120174"
	},
	"sales_person": {
		"name": "Angus Wu",
		"employee_number": "29325"
	},
	"customer": {
		"id": 1,
		"name": "Sebastian",
		"address": "5233 Cass St, San Diego, CA",
		"phone_number": "123-456-7890"
	}
}
```

</details>
<details>
<summary><strong>List of sales output</strong></summary>

```
{
	"sales": [
		{
			"id": 1,
			"price": "73128",
			"automobile": {
				"vin": "1C3CC5FB2AN120174"
			},
			"sales_person": {
				"name": "Angus Wu",
				"employee_number": "29325"
			},
			"customer": {
				"id": 1,
				"name": "Sebastian",
				"address": "5233 Cass St, San Diego, CA",
				"phone_number": "123-456-7890"
			}
		}
	]
}
```

</details>
<details>
<summary><strong>Delete sale output</strong></summary>

```
{
	"Deleted": true
}

```

</details>
