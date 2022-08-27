from django.db import models

# Create your models here.
from apps.category.models import Category
from apps.store.models import Store


class Inventory(models.Model):
    group = models.ForeignKey(Category, on_delete=models.PROTECT, related_name='inventories', null=True,
                              verbose_name='Grupo')
    store = models.ManyToManyField(Store, through='StoreInventory', related_name='inventories_store',
                                   verbose_name='Tienda', blank=True)
    name = models.CharField(max_length=50, verbose_name='Nombre')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Fecha de creación')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Fecha de actualización')

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Inventario'
        verbose_name_plural = 'Inventarios'
        unique_together = (['name', 'group'])


    def __str__(self):
        return self.name + ' - ' + self.group.name

    def group_name(self):
        return self.group.name


class StoreInventory(models.Model):
    store = models.ForeignKey(Store, models.PROTECT)
    inventory = models.ForeignKey(Inventory, models.PROTECT)
    count = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = 'Inventario de tienda'
        verbose_name_plural = 'Inventarios de tienda'
        unique_together = (['store', 'inventory'])

    def __str__(self):
        return self.store.location + ' - ' + self.inventory.name + ' - ' + self.inventory.group.name



