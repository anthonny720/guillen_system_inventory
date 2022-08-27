from django.contrib.auth import get_user_model
from django.db import models
from django.utils.text import slugify

# Create your models here.

User = get_user_model()


class Store(models.Model):
    location = models.CharField(max_length=100, unique=True, verbose_name='Ubicación')
    slug = models.SlugField(unique=True, blank=True, verbose_name='Slug')
    address = models.CharField(max_length=100, verbose_name='Dirección')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Fecha de creación')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Fecha de actualización')

    def get_stock_total(self):
        sum = 0
        try:
            for inventory in self.storeinventory_set.all():
                sum += inventory.count
            return sum
        except:
            return 0


    def __str__(self):
        return self.location

    def save(self, *args, **kwargs):
        self.slug = slugify(self.location)
        super(Store, self).save(*args, **kwargs)

    def update(self, *args, **kwargs):
        self.slug = slugify(self.location)
        super(Store, self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "Almacenes"
        verbose_name = "Almacén"
        ordering = ['id']
