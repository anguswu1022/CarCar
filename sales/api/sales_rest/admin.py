from django.contrib import admin
from .models import AutomobileVO, Customer, Sale, Sales_Person


# Register your models here.
@admin.register(AutomobileVO)
class AutomobileVOAdmin(admin.ModelAdmin):
    pass

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    pass

@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    pass

@admin.register(Sales_Person)
class Sale_PersonAdmin(admin.ModelAdmin):
    pass
