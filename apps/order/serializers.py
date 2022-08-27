from rest_framework import serializers

from apps.order.models import Order


class OrderSerializer(serializers.ModelSerializer):
    year = serializers.CharField(source='get_year', read_only=True)
    month = serializers.CharField(source='get_month', read_only=True)
    day = serializers.CharField(source='get_day', read_only=True)
    store = serializers.CharField(source='get_store', read_only=True)
    product = serializers.CharField(source='get_product', read_only=True)

    class Meta:
        model = Order
        fields = ('__all__')
