# Generated by Django 4.1 on 2022-08-26 06:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0002_inventory_x'),
    ]

    operations = [
        migrations.AlterField(
            model_name='inventory',
            name='x',
            field=models.CharField(max_length=50, verbose_name='d'),
        ),
    ]
