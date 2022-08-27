from rest_framework import serializers

from apps.inventory.models import Inventory, StoreInventory


class InventorySerializer(serializers.ModelSerializer):
    group_name = serializers.CharField(source='group.name', read_only=True)

    class Meta:
        model = Inventory
        fields = '__all__'
        read_only_fields = ('id',)


class StoreInventorySerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='inventory.name', read_only=True)
    category_name = serializers.CharField(source='inventory.group.name', read_only=True)

    class Meta:
        model = StoreInventory
        fields = '__all__'
        read_only_fields = ('id',)

