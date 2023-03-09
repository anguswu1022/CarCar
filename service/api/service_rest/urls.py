from django.urls import path
from .views import api_technicians, api_technician, api_appointments, api_appointment, api_appointments_by_vin, api_appointment_cancel, api_appointment_complete

urlpatterns = [
    path("technicians/", api_technicians, name="api_list_technicians"),
    path("technicians/<int:pk>/", api_technician, name="api_technician"),
    path("appointments/", api_appointments, name="api_list_appointments"),
    path("appointments/<int:pk>/", api_appointment, name="api_appointment"),
    path("appointments/vin/<str:vin>/", api_appointments_by_vin, name="api_appointments_by_vin"),
    path("appointments/<int:pk>/cancel/", api_appointment_cancel, name="api_appointment_cancel"),
    path("appointments/<int:pk>/complete/", api_appointment_complete, name="api_appointment_complete"),
]
