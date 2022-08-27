from django.urls import path

from apps.inventory.views import CreateInventory, UpdateInventory, DeleteInventory, ListInventory

urlpatterns = [
    path('get-inventories', ListInventory.as_view(), name='get-inventories'),
    path('add-inventory', CreateInventory.as_view(), name='add-inventory'),
    path('update-inventory/<id>', UpdateInventory.as_view(), name='update-inventory'),
    path('delete-inventory/<id>', DeleteInventory.as_view(), name='delete-inventory'),
]
