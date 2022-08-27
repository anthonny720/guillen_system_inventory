from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.inventory.models import StoreInventory
from apps.order.models import Order
from apps.order.serializers import OrderSerializer
from apps.users.views import add_user_activity
from datetime import datetime

# Create your views here.
class ListOrderView(APIView):
    def get(self, request):
        if Order.objects.all().exists():
            serializer = OrderSerializer(Order.objects.all(), many=True)
            return Response({'orders': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No existen ordenes'}, status=status.HTTP_404_NOT_FOUND)


class CreateOrderView(APIView):
    def post(self, request):
        actions = ('Tarma', 'La Merced', 'Huancayo', 'Pichanaqui', 'Fabrica', 'Venta')
        try:
            id_store_inventory = int(request.data['id'])
        except:
            return Response({'error': 'No se pudo obtener el id del inventario'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            inventory = StoreInventory.objects.get(id=id_store_inventory)
        except:
            return Response({'error': 'No se pudo obtener el inventario'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            count = int(request.data['count'])
        except:
            return Response({'error': 'No se pudo obtener la cantidad'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            motion = request.data['type']
        except:
            return Response({'error': 'No se pudo obtener el tipo'}, status=status.HTTP_400_BAD_REQUEST)
        if not motion in actions:
            return Response({'error': 'La acción no es válida'}, status=status.HTTP_400_BAD_REQUEST)
        if inventory.store.location == motion:
            return Response({'error': 'Solicitud inválida, verifique su destino'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            if inventory.count < count:
                return Response({'error': 'No hay suficiente stock'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                inventory.count -= count
                inventory.save()
                order = Order(inventory_store=inventory, count=count, motion=motion)
                order.save()
                add_user_activity(request.user, 'Registró la orden : ' + str(order.id))
            return Response({'message': "Orden registrada correctamente"}, status=status.HTTP_200_OK)
        except:
            return Response({'error': 'No se pudo crear la orden'}, status=status.HTTP_400_BAD_REQUEST)


class DeleteOrderView(APIView):
    def delete(self, request, *args, **kwargs):
        try:
            id_order = int(kwargs['id'])
        except:
            return Response({'error': 'No se pudo obtener el id de la orden'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            order = Order.objects.get(id=id_order)
        except:
            return Response({'error': 'No se pudo obtener la orden'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            inventory = StoreInventory.objects.get(id=order.inventory_store.id)
            inventory.count += order.count
            inventory.save()
            order.delete()
            add_user_activity(request.user, 'Eliminó una orden:' + str(id_order))
            return Response({'message': 'Orden eliminada correctamente'}, status=status.HTTP_200_OK)
        except:
            return Response({'error': 'No se pudo eliminar la orden'}, status=status.HTTP_400_BAD_REQUEST)


class SummaryOrderView(APIView):
    def get(self, request):
        current_date = datetime.date(datetime.now())
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
                  'November', 'December']
        orders = Order.objects.filter(created_at__year=current_date.year)
        orders_by_month = {}
        for month in months:
            orders_by_month[month] = 0
        for order in orders:
            orders_by_month[order.created_at.strftime('%B')] += order.count
        return Response({'orders_by_month': orders_by_month}, status=status.HTTP_200_OK)
