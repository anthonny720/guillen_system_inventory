from django.contrib import admin
from django.contrib.auth import get_user_model
from import_export.admin import ImportExportModelAdmin

from apps.users.models import UserAccount, UserActivity

User = get_user_model()


class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'first_name', 'last_name', 'is_active', 'is_staff', 'role', 'created_at')
    list_filter = ('is_active', 'is_staff', 'role')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ['-id']
    list_per_page = 25


class UserActivityAdmin(admin.ModelAdmin):
    list_display = ('user', 'action', 'created_at')
    list_display_links = ('user', 'action', 'created_at')
    search_fields = ('user', 'action', 'created_at')
    list_per_page = 25


admin.site.register(UserActivity, UserActivityAdmin)

admin.site.register(User, UserAdmin)
