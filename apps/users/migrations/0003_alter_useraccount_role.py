# Generated by Django 4.1 on 2022-08-27 08:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_alter_useraccount_role'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useraccount',
            name='role',
            field=models.CharField(choices=[('Administrador', 'Administrador'), ('Editor', 'Editor'), ('Visualizador', 'Visualizador')], default='Visualizador', max_length=13),
        ),
    ]
