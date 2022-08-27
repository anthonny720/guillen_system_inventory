from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from apps.category.models import Category


class CategoryAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ('name','created_at',)
    list_per_page = 10


admin.site.register(Category, CategoryAdmin)
