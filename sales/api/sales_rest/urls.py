from django.urls import path
from .views import api_sales_persons, api_customers, api_sales

urlpatterns = [
    path('sales_persons/', api_sales_persons, name="api_sales_persons"),
    path('customers/', api_customers, name="api_customers"),
    path('sales/', api_sales, name="api_sales"),
]
