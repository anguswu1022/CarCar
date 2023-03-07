# Generated by Django 4.0.3 on 2023-03-07 01:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='technician',
            name='email',
        ),
        migrations.RemoveField(
            model_name='technician',
            name='phone',
        ),
        migrations.AddField(
            model_name='technician',
            name='employee_id',
            field=models.CharField(default='00000', max_length=200),
        ),
    ]