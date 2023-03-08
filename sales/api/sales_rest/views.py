from django.shortcuts import render
from .models import AutomobileVO, Sales_Person, Customer, Sale
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .encoders import SaleEncoder, SalesPersonEncoder, CustomerEncoder
import json


# Create your views here.
@require_http_methods(["GET", "POST"])
def api_sales_persons(request):
    if request.method == "GET":
        sales_persons = Sales_Person.objects.all()
        return JsonResponse(
            {"sales_persons": sales_persons},
            encoder=SalesPersonEncoder,
        )
    else:
        content = json.loads(request.body)
        sales_person = Sales_Person.objects.create(**content)
        return JsonResponse(
            sales_person,
            encoder=SalesPersonEncoder,
            safe=False,
        )

@require_http_methods(["GET", "DELETE", "PUT"])
def api_sales_person(request, id):
    if request.method == "GET":
        try:
            sales_person = Sales_Person.objects.get(id=id)
            return JsonResponse(
                sales_person,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except Sales_Person.DoesNotExist:
            return JsonResponse(
                {"message": "Sales person does not exist"},
                status=404,
            )
    elif request.method == "DELETE":
        count, _ = Sales_Person.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        try:
            if "sales_person" in content:
                sales_person = Sales_Person.objects.get(employee_number=content["sales_person"])
                content["sales_person"] = sales_person
        except Sales_Person.DoesNotExist:
            return JsonResponse(
                {"message": "Sales person does not exist"},
                status=404,
            )
        Sales_Person.objects.filter(id=id).update(**content)
        sales_person = Sales_Person.objects.get(id=id)
        return JsonResponse(
            sales_person,
            encoder=SalesPersonEncoder,
            safe=False,
        )


@require_http_methods(["GET", "POST"])
def api_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
        )
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )

@require_http_methods(["GET", "DELETE", "PUT"])
def api_customer(request, id):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=id)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer does not exist"},
                status=404,
            )
    elif request.method == "DELETE":
        count, _ = Customer.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        try:
            if "customer" in content:
                customer = Customer.objects.get(id=content["customer"])
                content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer does not exist"},
                status=404,
            )
        Customer.objects.filter(id=id).update(**content)
        customer = Customer.objects.get(id=id)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )


@require_http_methods(["GET", "POST"])
def api_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()

        return JsonResponse(
            {"sales": sales},
            encoder=SaleEncoder,
        )
    else:
        content = json.loads(request.body)

        try:
            automobile = AutomobileVO.objects.get(vin=content["automobile"])
            content["automobile"] = automobile

            customer = Customer.objects.get(id=content["customer"])
            content["customer"] = customer

            sales_person = Sales_Person.objects.get(employee_number=content["sales_person"])
            content["sales_person"] = sales_person

        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid automobile vin"},
                status=400,
            )

        sale = Sale.objects.create(**content)
        return JsonResponse(
            sale,
            encoder=SaleEncoder,
            safe=False,
        )


@require_http_methods(["GET", "DELETE"])
def api_sale(request, id):
    if request.method == "GET":
        try:
            sale = Sale.objects.get(id=id)
            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False,
            )
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "Sale does not exist"},
                status=404,
            )
    else:
        count, _ = Sale.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
