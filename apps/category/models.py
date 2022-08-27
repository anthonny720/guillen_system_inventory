from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.utils.text import slugify


# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=50, verbose_name='Nombre',unique=True)
    slug = models.SlugField(unique=True, blank=True, verbose_name='Slug')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Fecha de creación')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Fecha de actualización')

    def __str__(self):
        return self.name


    # def get_stock_total(self):
    #     return self.inventories.aggregate(total=models.Sum('stock'))['total'] or 0

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Category, self).save(*args, **kwargs)

    def update(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Category, self).save(*args, **kwargs)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Grupo'
        verbose_name_plural = 'Grupos'

