from django.contrib import admin
from import_export.admin import ImportExportModelAdmin

# Register your models here.
from apps.store.models import Store


class StoreAdmin(ImportExportModelAdmin,admin.ModelAdmin):
    list_display = ('location',)
    list_per_page = 10
admin.site.register(Store, StoreAdmin)