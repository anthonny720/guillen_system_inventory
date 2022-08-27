# Create your views here.
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.users.models import UserActivity


User = get_user_model()


def add_user_activity(user, action):
    UserActivity.objects.create(
        user=user,
        action=action
    )


class ListUserActivityView(APIView):
    def get(self, request):
        if UserActivity.objects.all().exists():
            result = [{'user': activity.get_user(), 'action': activity.action, 'date': activity.created_at_str()} for activity
                      in
                      UserActivity.objects.all().order_by('-id')]
            return Response({'activities': result}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron actividades'}, status=status.HTTP_404_NOT_FOUND)


class DeleteUserView(APIView):
    def delete(self, request, *args, **kwargs):
        try:
            id = int(kwargs['id'])
        except:
            return Response({'error': 'El id debe ser un numero entero'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = User.objects.get(id=id)
        except:
            return Response({'error': 'No se encontro el usuario'}, status=status.HTTP_404_NOT_FOUND)
        if user.id == request.user.id:
            return Response({'error': 'Solicitud incorrecta, intentelo otra vez!'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            name = user.first_name
            user.delete()
            add_user_activity(request.user, 'Eliminó un usuario : ' + name)
            return Response({'message': 'Usuario eliminado'}, status=status.HTTP_200_OK)
        except:
            return Response({'error': 'No se pudo eliminar el usuario'}, status=status.HTTP_400_BAD_REQUEST)


class UpdateUserView(APIView):
    def patch(self, request, *args, **kwargs):
        try:
            id = int(kwargs['id'])
        except:
            return Response({'error': 'El id debe ser un numero entero'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = User.objects.get(id=id)
        except:
            return Response({'error': 'No se encontro el usuario'}, status=status.HTTP_404_NOT_FOUND)
        try:
            user.first_name = request.data['first_name']
            user.last_name = request.data['last_name']
            user.last_name = request.data['last_name']
            user.role= request.data['role']
            if request.data['password'] != '':
                user.set_password(request.data['password'])
            user.save()
            add_user_activity(request.user, 'Actualizó un usuario : ' + user.first_name + ' ' + user.last_name)
            return Response({'message': 'Usuario actualizado'}, status=status.HTTP_200_OK)
        except:
            return Response({'error': 'No se pudo actualizar el usuario'}, status=status.HTTP_400_BAD_REQUEST)
