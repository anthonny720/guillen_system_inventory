# Generated by Django 4.1 on 2022-08-27 10:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0013_alter_inventory_name_alter_inventory_unique_together'),
        ('order', '0008_alter_order_inventory_store'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='inventory_store',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='orders', to='inventory.storeinventory'),
        ),
    ]
