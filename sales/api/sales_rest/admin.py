from django.contrib import admin
from .models import Customer, Sale, Sales_Person


# Register your models here.
@admin.register(Customer, Sale, Sales_Person)
class SalesAdmin(admin.ModelAdmin):
    pass
