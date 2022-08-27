from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.category.models import Category
from apps.inventory.models import Inventory
from apps.inventory.serializers import InventorySerializer
from apps.users.views import add_user_activity


# Create your views here.

class ListInventory(APIView):
    def get(self, request):
        if Inventory.objects.all().exists():
            inventory = Inventory.objects.all()
            serializer = InventorySerializer(inventory, many=True)
            return Response({'inventories': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No existen inventarios'}, status=status.HTTP_404_NOT_FOUND)


class CreateInventory(APIView):

    def post(self, request):
        print(request.data)
        try:
            name = request.data['name']
        except:
            return Response({'message': 'No se ha recibido el nombre del inventario'},
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            group = int(request.data['group'])
        except:
            return Response({'message': 'El grupo del inventario debe ser un número entero'},
                            status=status.HTTP_400_BAD_REQUEST)
        try:
            category=Category.objects.get(id=group)
            Inventory.objects.create(name=name, group=category)
            add_user_activity(request.user, 'Registro un producto : ' + name)
            return Response({'message': f'Producto {name} creado correctamente'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': "Ya existe un producto registrado para esa categoria con ese nombre"}, status=status.HTTP_400_BAD_REQUEST)


class UpdateInventory(APIView):
    def patch(self, request, *args, **kwargs):
        print(request.data)
        try:
            id = int(kwargs['id'])
        except:
            return Response({'message': 'El id del inventario debe ser un número entero'},
                            status=status.HTTP_400_BAD_REQUEST)
        try:
            inventory = Inventory.objects.get(id=id)
        except:
            return Response({'message': 'No existe el inventario'}, status=status.HTTP_404_NOT_FOUND)
        try:
            name = request.data['name']
        except:
            return Response({'message': 'No se ha recibido el nombre del inventario'},
                            status=status.HTTP_400_BAD_REQUEST)
        try:
            group = request.data['group']
        except:
            return Response({'message': 'El grupo del inventario debe ser un número entero'},
                            status=status.HTTP_400_BAD_REQUEST)
        try:
            category = Category.objects.get(id=group)
            inventory.name = name
            inventory.group = category
            inventory.save()
            add_user_activity(request.user, 'Actualizó un producto : ' + name)
            return Response({'message': f'Producto {name} actualizado correctamente'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': "Ya existe un producto registrado para esa categoria con ese nombre"}, status=status.HTTP_400_BAD_REQUEST)


class DeleteInventory(APIView):
    def delete(self, request, *args, **kwargs):
        try:
            id = int(kwargs['id'])
        except:
            return Response({'message': 'El id del inventario debe ser un número entero'},
                            status=status.HTTP_400_BAD_REQUEST)
        try:
            inventory = Inventory.objects.get(id=id)
        except:
            return Response({'message': 'No existe el inventario'}, status=status.HTTP_404_NOT_FOUND)
        try:
            name = inventory.name
            inventory.delete()
            add_user_activity(request.user, 'Eliminó un producto : ' + name)

            return Response({'message': f'Producto {name} eliminado correctamente'}, status=status.HTTP_200_OK)
        except:
            return Response({'message': 'Error al eliminar el inventario'}, status=status.HTTP_400_BAD_REQUEST)


