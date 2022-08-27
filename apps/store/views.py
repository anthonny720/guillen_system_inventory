from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.inventory.models import StoreInventory, Inventory
from apps.inventory.serializers import StoreInventorySerializer, InventorySerializer
from apps.store.models import Store
from apps.store.serializers import StoreSerializer


# Create your views here.
class ListStoreView(APIView):
    def get(self, request):
        if Store.objects.all().exists():
            result = StoreSerializer(Store.objects.all(), many=True).data
            return Response({'stores': result}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron almacenes'}, status=status.HTTP_404_NOT_FOUND)


class UpdateStoreView(APIView):
    def patch(self, request, *args, **kwargs):
        try:
            id = int(kwargs['id'])
        except:
            return Response({'error': 'El id debe ser un número entero'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            store = Store.objects.get(id=id)
        except:
            return Response({'error': 'No se encontró la categoría'}, status=status.HTTP_404_NOT_FOUND)
        try:
            location = request.data['location']
        except:
            return Response({'error': 'Debe ingresar un lugar'}, status=status.HTTP_404_NOT_FOUND)
        try:
            address = request.data['address']
        except:
            return Response({'error': 'Debe ingresar una ubicación'}, status=status.HTTP_404_NOT_FOUND)
        try:
            store.location = location
            store.address = address
            store.save()
            return Response({'message': f'Almacén {store.location} actualizado correctamente'},
                            status=status.HTTP_200_OK)
        except:
            return Response({'error': 'No se pudo actualizar el almacén'}, status=status.HTTP_400_BAD_REQUEST)


class DeleteStoreView(APIView):
    def delete(self, request, *args, **kwargs):
        try:
            id = int(kwargs['id'])
        except:
            return Response({'error': 'El id debe ser un número entero'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            store = Store.objects.get(id=id)
        except:
            return Response({'error': 'No se encontró el almacén'}, status=status.HTTP_404_NOT_FOUND)
        try:
            name = store.location
            store.delete()
            return Response({'message': f'Almacén {store.location} eliminado'}, status=status.HTTP_200_OK)
        except:
            return Response({'error': 'No se pudo eliminar el almacén'}, status=status.HTTP_400_BAD_REQUEST)


class CreateStoreView(APIView):
    def post(self, request):
        try:
            location = request.data['location']
        except:
            return Response({'error': 'Debe ingresar un lugar'}, status=status.HTTP_404_NOT_FOUND)
        try:
            address = request.data['address']
        except:
            return Response({'error': 'Debe ingresar una ubicación'}, status=status.HTTP_404_NOT_FOUND)
        try:
            Store.objects.create(location, address)
            return Response({'message': f'Almacén {location} registrado correctamente'}, status=status.HTTP_200_OK)
        except:
            return Response({'error': 'No se pudo registrar el almacén'}, status=status.HTTP_400_BAD_REQUEST)


class ListInventoryStore(APIView):
    def get(self, request, *args, **kwargs):
        try:
            slug = kwargs['slug']
        except:
            return Response({'error': 'Debe ingresar un slug'}, status=status.HTTP_404_NOT_FOUND)
        try:
            store = Store.objects.get(slug=slug)
        except:
            return Response({'error': 'No se encontró el almacén'}, status=status.HTTP_404_NOT_FOUND)
        try:
            si = StoreInventory.objects.filter(store=store)
            result = StoreInventorySerializer(si, many=True).data
            return Response({'stores': result}, status=status.HTTP_200_OK)
        except:
            return Response({'error': 'No se encontraron inventarios en el almacén'}, status=status.HTTP_404_NOT_FOUND)


class ListProductsAvailableStore(APIView):
    def get(self, request, *args, **kwargs):
        try:
            slug = kwargs['slug']
        except:
            return Response({'error': 'Debe ingresar un slug'}, status=status.HTTP_404_NOT_FOUND)
        try:
            store = Store.objects.get(slug=slug)
        except:
            return Response({'error': 'No se encontró el almacén'}, status=status.HTTP_404_NOT_FOUND)
        try:
            list = []
            si = StoreInventory.objects.filter(store=store)
            for i in si:
                list.append(i.inventory.id)
            inv = Inventory.objects.all().exclude(id__in=list)
            result = InventorySerializer(inv, many=True).data
            return Response({'available': result}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)


class CreateInventoryStore(APIView):
    def post(self, request, *args, **kwargs):
        try:
            slug = kwargs['slug']
        except:
            return Response({'error': 'Debe ingresar un slug'}, status=status.HTTP_404_NOT_FOUND)
        try:
            store = Store.objects.get(slug=slug)
        except:
            return Response({'error': 'No se encontró el almacén'}, status=status.HTTP_404_NOT_FOUND)
        try:
            inventory = int(request.data['inventory'])
        except:
            return Response({'error': 'Debe ingresar un id de inventario'}, status=status.HTTP_404_NOT_FOUND)
        try:
            inventory = Inventory.objects.get(id=inventory)
        except:
            return Response({'error': 'No se encontró el inventario'}, status=status.HTTP_404_NOT_FOUND)
        try:
            StoreInventory.objects.create(store=store, inventory=inventory)
            return Response({'message': f'Inventario {inventory.name} registrado correctamente'},
                            status=status.HTTP_200_OK)
        except:
            return Response({'error': 'No se pudo registrar el inventario'}, status=status.HTTP_400_BAD_REQUEST)


class DeleteInventoryStore(APIView):
    def delete(self, request, *args, **kwargs):
        try:
            id = int(kwargs['id'])
        except:
            return Response({'error': 'El id debe ser un número entero'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            si = StoreInventory.objects.get(id=id)
        except:
            return Response({'error': 'No se encontró el inventario'}, status=status.HTTP_404_NOT_FOUND)
        try:
            si.delete()
            return Response({'message': f'Inventario {si.inventory.name} eliminado del almacen'},
                            status=status.HTTP_200_OK)
        except:
            return Response({'error': 'No se pudo eliminar el inventario'}, status=status.HTTP_400_BAD_REQUEST)


class UpdateInventoryStore(APIView):
    def patch(self, request, *args, **kwargs):
        try:
            id = int(kwargs['id'])
        except:
            return Response({'error': 'El id debe ser un número entero'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            si = StoreInventory.objects.get(id=id)
        except:
            return Response({'error': 'No se encontró el inventario'}, status=status.HTTP_404_NOT_FOUND)
        try:
            count = int(request.data['count'])
        except:
            return Response({'error': 'Debe ingresar una cantidad'}, status=status.HTTP_404_NOT_FOUND)
        try:
            si.count = count
            si.save()
            return Response({'message': f'Inventario {si.inventory.name} actualizado correctamente'},
                            status=status.HTTP_200_OK)
        except:
            return Response({'error': 'No se pudo actualizar el inventario'}, status=status.HTTP_400_BAD_REQUEST)
