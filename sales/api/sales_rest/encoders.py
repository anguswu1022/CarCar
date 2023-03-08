from common.json import ModelEncoder
from .models import AutomobileVO, Sales_Person, Customer, Sale


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
    ]

class SalesPersonEncoder(ModelEncoder):
    model = Sales_Person
    properties = [
        "name",
        "employee_number",
    ]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "name",
        "address",
        "phone_number",
    ]

class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "id",
        "price",
        "automobile",
        "sales_person",
        "customer",
    ]
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "sales_person": SalesPersonEncoder(),
        "customer": CustomerEncoder(),
    }
