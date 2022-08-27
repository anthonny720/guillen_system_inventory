from rest_framework import serializers

from apps.store.models import Store


class StoreSerializer(serializers.ModelSerializer):
    stock_total= serializers.CharField(source='get_stock_total', read_only=True)
    class Meta:
        model = Store
        fields = '__all__'
        read_only_fields = ('id',)
