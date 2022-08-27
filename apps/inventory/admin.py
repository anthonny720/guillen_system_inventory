from django.contrib import admin
from import_export.admin import ImportExportModelAdmin


# Register your models here.
from apps.inventory.models import Inventory, StoreInventory


class InventoryAdmin(ImportExportModelAdmin,admin.ModelAdmin):
    list_per_page = 10
    search_fields = ('group',)


admin.site.register(Inventory, InventoryAdmin)
admin.site.register(StoreInventory)
