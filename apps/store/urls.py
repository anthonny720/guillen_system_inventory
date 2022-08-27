from django.urls import path

from apps.store.views import ListStoreView, UpdateStoreView, DeleteStoreView, CreateStoreView, ListInventoryStore, \
    ListProductsAvailableStore, CreateInventoryStore, DeleteInventoryStore, UpdateInventoryStore

urlpatterns = [
    path('get-stores', ListStoreView.as_view(), name='get-stores'),
    path('update-category/<id>', UpdateStoreView.as_view(), name='update-category'),
    path('delete-category/<id>', DeleteStoreView.as_view(), name='delete-category'),
    path('add-category', CreateStoreView.as_view(), name='add-category'),
    path('get-store/<slug>', ListInventoryStore.as_view(), name='get-store'),
    path('add-inventory-store/<slug>', CreateInventoryStore.as_view(), name='add-inventory-store'),
    path('delete-inventory-store/<id>', DeleteInventoryStore.as_view(), name='delete-inventory-store'),
    path('update-inventory-store/<id>', UpdateInventoryStore.as_view(), name='update-inventory-store'),
    path('get-list-available/<slug>', ListProductsAvailableStore.as_view(), name='get-list-available')
]
