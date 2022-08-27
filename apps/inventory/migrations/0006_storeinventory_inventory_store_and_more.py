# Generated by Django 4.1 on 2022-08-26 07:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0001_initial'),
        ('category', '0002_alter_category_slug'),
        ('inventory', '0005_remove_inventory_stock_remove_inventory_group_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='StoreInventory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('count', models.PositiveIntegerField()),
            ],
        ),
        migrations.AddField(
            model_name='inventory',
            name='store',
            field=models.ManyToManyField(related_name='inventories_store', through='inventory.StoreInventory', to='store.store', verbose_name='Tienda'),
        ),
        migrations.RemoveField(
            model_name='inventory',
            name='group',
        ),
        migrations.DeleteModel(
            name='CategoryInventory',
        ),
        migrations.AddField(
            model_name='storeinventory',
            name='inventory',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='inventory.inventory'),
        ),
        migrations.AddField(
            model_name='storeinventory',
            name='store',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='store.store'),
        ),
        migrations.AddField(
            model_name='inventory',
            name='group',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='inventories', to='category.category', verbose_name='Grupo'),
        ),
    ]
