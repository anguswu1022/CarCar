# Generated by Django 4.0.3 on 2023-03-07 01:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0002_remove_technician_email_remove_technician_phone_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='technician',
            name='employee_id',
            field=models.CharField(max_length=200),
        ),
    ]
