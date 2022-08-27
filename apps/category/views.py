from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.category.models import Category
from apps.category.serializers import CategorySerializer
from apps.users.views import add_user_activity


# Create your views here.
class ListCategoryView(APIView):
    def get(self, request):
        if Category.objects.all().exists():
            categories = Category.objects.all()
            serializer = CategorySerializer(categories, many=True)
            return Response({'categories': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No categories found'}, status=status.HTTP_404_NOT_FOUND)


class UpdateCategoryView(APIView):
    def patch(self, request, *args, **kwargs):
        try:
            id = int(kwargs['id'])
        except:
            return Response({'error': 'El id debe ser un número entero'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            name = request.data['name']
        except:
            return Response({'error': 'Debe ingresar un nombre'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            category = Category.objects.get(id=id)
        except:
            return Response({'error': 'No se encontró la categoría'}, status=status.HTTP_404_NOT_FOUND)
        try:
            category.name = request.data['name']
            category.save()
            add_user_activity(request.user, 'Actualizó una categoria : ' + name)
            return Response({'message': f'Categoría {category.name} actualizada'}, status=status.HTTP_200_OK)
        except:
            return Response({'error': "El nombre de la categoria ya esta registrado"},
                            status=status.HTTP_400_BAD_REQUEST)


class DeleteCategoryView(APIView):
    def delete(self, request, *args, **kwargs):
        try:
            id = int(kwargs['id'])
        except:
            return Response({'error': 'El id debe ser un número entero'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            category = Category.objects.get(id=id)
        except:
            return Response({'error': 'No se encontró la categoría'}, status=status.HTTP_404_NOT_FOUND)
        try:
            name = category.name
            category.delete()
            add_user_activity(request.user, 'Eliminó una categoria : ' + name)
            return Response({'message': f'Categoría {category.name} eliminada'}, status=status.HTTP_200_OK)
        except:
            return Response({'error': 'No se pudo eliminar la categoría'}, status=status.HTTP_400_BAD_REQUEST)


class CreateCategoryView(APIView):
    def post(self, request):
        try:
            name = request.data['name']
        except:
            return Response({'error': 'Debe ingresar un nombre'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            Category.objects.create(name=name)
            add_user_activity(request.user, 'Registró una categoria : ' + name)
            return Response({'message': f'Categoría f{name} creada'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': "El nombre de la categoria ya esta registrado"},
                            status=status.HTTP_400_BAD_REQUEST)


class DetailCategoryView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            slug = kwargs['slug']
        except:
            return Response({'error': 'Debe ingresar un slug'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            category = Category.objects.get(slug=slug)
        except:
            return Response({'error': 'No se encontró la categoría'}, status=status.HTTP_404_NOT_FOUND)
        try:
            result = []
            for product in category.inventories.all():
                for p in product.storeinventory_set.all():
                    result.append({'store': p.store.location, 'product': product.name, 'stock': p.count,
                                   'store_slug': p.store.slug})
            return Response({'result': result, 'category': category.name}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
