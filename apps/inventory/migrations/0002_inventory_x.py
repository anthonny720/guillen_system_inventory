# Generated by Django 4.1 on 2022-08-26 06:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='inventory',
            name='x',
            field=models.CharField(default='', max_length=50, verbose_name='Nombre'),
            preserve_default=False,
        ),
    ]
