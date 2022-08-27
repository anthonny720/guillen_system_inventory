# Generated by Django 4.1 on 2022-08-26 07:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0001_initial'),
        ('inventory', '0006_storeinventory_inventory_store_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='storeinventory',
            options={'verbose_name': 'Inventario de tienda', 'verbose_name_plural': 'Inventarios de tienda'},
        ),
        migrations.AlterUniqueTogether(
            name='storeinventory',
            unique_together={('store', 'inventory')},
        ),
    ]
