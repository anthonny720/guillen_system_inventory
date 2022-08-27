from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer

User = get_user_model()


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = (
            'id',
            'email',
            'first_name',
            'last_name',
            'get_full_name',
            'get_short_name',
            'password',
            'role')

# class UserActivitySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UserActivity
#         fields = ('user', 'activity', 'created_at')
#         read_only_fields = ('created_at',)
#         extra_kwargs = {'user': {'write_only': True}}
