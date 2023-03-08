from django.urls import path
from .views import api_technicians, api_technician, api_appointments, api_appointment, api_appointments_by_vin

urlpatterns = [
    path("technicians/", api_technicians, name="api_list_technicians"),
    path("technicians/<int:pk>/", api_technician, name="api_technician"),
    path("appointments/", api_appointments, name="api_list_appointments"),
    path("appointments/<int:pk>/", api_appointment, name="api_appointment"),
    path("appointments/vin/<str:vin>/", api_appointments_by_vin, name="api_appointments_by_vin"),
]
