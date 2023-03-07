from django.urls import path
from .views import (api_sales_persons, api_customers, api_sales, api_sales_person)

urlpatterns = [
    path('sales_persons/', api_sales_persons, name="api_sales_persons"),
    path('sales_persons/<int:id>/', api_sales_person, name="api_sales_person"),
    path('customers/', api_customers, name="api_customers"),
    path('sales/', api_sales, name="api_sales"),
]
