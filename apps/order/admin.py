from django.contrib import admin

from apps.order.models import Order


# Register your models here.
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'created_at', 'inventory_store', 'count', 'motion')
    list_filter = ('created_at', 'inventory_store', 'motion')
    search_fields = ('id', 'created_at', 'inventory_store', 'count', 'motion')
    ordering = ['-created_at']

