from django.urls import path

from .views import DeleteUserView, UpdateUserView, ListUserActivityView

app_name = "users"

urlpatterns = [
    path('get-history', ListUserActivityView.as_view(), name='get-history'),
    path('delete-user/<id>', DeleteUserView.as_view(), name='delete-user'),
    path('update-user/<id>', UpdateUserView.as_view(), name='update-user'),
]
