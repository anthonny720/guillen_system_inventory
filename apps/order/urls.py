from django.urls import path

from apps.order.views import ListOrderView, CreateOrderView, DeleteOrderView, SummaryOrderView

urlpatterns = [
    path('get-orders', ListOrderView.as_view(), name='get-orders'),
    path('add-order', CreateOrderView.as_view(), name='add-order'),
    path('delete-order/<id>', DeleteOrderView.as_view(), name='delete-order'),
    path('summary', SummaryOrderView.as_view(), name='summary'),
]
