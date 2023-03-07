from django.db import models
from django.urls import reverse


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    def __str__(self):
        return self.vin



class Technician(models.Model):
    name = models.CharField(max_length=200)
    employee_id = models.CharField(max_length=200)
    def get_api_url(self):
        return reverse("api_technician", kwargs={"pk": self.id})


class Appointment(models.Model):
    vin = models.ForeignKey(AutomobileVO, related_name="vinVO", on_delete=models.CASCADE)
    owner = models.CharField(max_length=200)
    date = models.DateField()
    time = models.TimeField()
    technician = models.ForeignKey(Technician, on_delete=models.CASCADE)
    reason = models.CharField(max_length=250)
    def __str__(self):
        return self.vin
