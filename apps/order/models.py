from django.db import models

from apps.inventory.models import StoreInventory

actions = (('Tarma', 'Tarma'), ('La merced', 'La Merced'), ('Huancayo', 'Huancayo'), ('Pichanaqui', 'Pichanaqui'),
           ('Fabrica', 'Fabrica'), ('Venta', 'Venta'))
# Create your models here.
class Order(models.Model):
    created_at = models.DateField(auto_now_add=True)
    inventory_store = models.ForeignKey(StoreInventory,null=True, on_delete=models.PROTECT, related_name='orders')
    count = models.PositiveIntegerField(default=0)
    motion = models.CharField(max_length=10, choices=actions, default='Venta')

    def __str__(self):
        try:
            return self.inventory_store.inventory.name + ' - ' + self.inventory_store.store.location + ' - ' + self.motion
        except:
            return self.created_at.strftime('%d/%m/%Y %H:%M:%S')+' - '+self.motion

    class Meta:
        verbose_name_plural = "Ordenes"
        verbose_name = "Orden"
        ordering = ['-created_at']

    def get_store(self):
        try:
            return self.inventory_store.store.location
        except:
            return '-----------'

    def get_product(self):
        try:
            return self.inventory_store.inventory.name
        except:
            return '-----------'

    @property
    def get_year(self):
        return self.created_at.strftime('%Y')

    @property
    def get_month(self):
        return self.created_at.strftime('%B')

    @property
    def get_day(self):
        return self.created_at.strftime('%d')
