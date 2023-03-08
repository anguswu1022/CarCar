from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .models import AutomobileVO, Technician, Appointment
from common.json import ModelEncoder
from datetime import date, time


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
    ]

class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = [
        "name",
        "employee_id",
    ]

class TechnicianDetailEncoder(ModelEncoder):
    model = Technician
    properties = [
        "name",
        "employee_id",
    ]

class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "vin",
        "owner",
        "date",
        "time",
        "technician",
        "reason",
    ]
    def default(self, obj):
        if isinstance(obj, AutomobileVO):
            return obj.vin
        if isinstance(obj, date):
            return obj.strftime("%Y-%m-%d")
        if isinstance(obj, time):
            return obj.strftime("%H:%M")
        if isinstance(obj, Technician):
            return obj.name
        return super().default(obj)
    def get_api_url(self, obj):
        return obj.get_api_url()

class CreateAppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "vin",
        "owner",
        "date",
        "time",
        "technician",
        "reason",
    ]
    def get_extra_data(self, obj):
        return {
            "vin": obj.vin.vin,
            "technician": obj.technician.name
                }



@require_http_methods(["GET", "POST"])
def api_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianListEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianListEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the technician"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def api_technician(request, pk):
    if request.method == "GET":
        try:
            technician = Technician.objects.get(pk=pk)
            return JsonResponse(
                technician,
                encoder=TechnicianDetailEncoder,
                safe=False
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            technician = Technician.objects.get(pk=pk)
            technician.delete()
            return JsonResponse(
                technician,
                encoder=TechnicianDetailEncoder,
                safe=False
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "PUT":
        try:
            content = json.loads(request.body)
            technician = Technician.objects.get(pk=pk)
            technician.name = content['name']
            technician.employee_id = content['employee_id']
            technician.save()
            return JsonResponse(
                technician,
                encoder=TechnicianDetailEncoder,
                safe=False
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentListEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            vin, _ = AutomobileVO.objects.get_or_create(vin=content['vin'])
            technician, _ = Technician.objects.get_or_create(pk=content['technician'])
            content['vin'] = vin
            content['technician'] = technician
            appointment = Appointment.objects.create(**content)
            return JsonResponse(
                appointment,
                encoder=CreateAppointmentEncoder,
                safe=False,
            )
        except Exception as e:
            response = JsonResponse(
                {"message": f"Could not create the appointment- {e}"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def api_appointment(request, pk):
    if request.method == "GET":
        try:
            appointment = Appointment.objects.get(pk=pk)
            return JsonResponse(
                appointment,
                encoder=AppointmentListEncoder,
                safe=False
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            appointment = Appointment.objects.get(pk=pk)
            appointment.delete()
            return JsonResponse(
                appointment,
                encoder=AppointmentListEncoder,
                safe=False
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "PUT":
        try:
            content = json.loads(request.body)
            appointment = Appointment.objects.get(pk=pk)
            vin, _ = AutomobileVO.objects.get_or_create(vin=content['vin'])
            technician, _ = Technician.objects.get_or_create(pk=content['technician'])
            appointment.vin = vin
            appointment.owner = content['owner']
            appointment.date = content['date']
            appointment.time = content['time']
            appointment.technician = technician
            appointment.reason = content['reason']
            appointment.save()
            return JsonResponse(
                appointment,
                encoder=AppointmentListEncoder,
                safe=False
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
