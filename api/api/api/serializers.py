from django.contrib.auth.models import Group, User
from rest_framework import serializers

from api.api.models import PointOfInterest

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class PointOfInterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = PointOfInterest
        fields = ['id', 'name', 'category']

# class PointOfInterestSerializer(serializers.Serializer):
#     id = serializers.IntegerField(read_only=True)
#     name = serializers.CharField(max_length=120)
#     category = serializers.CharField(max_length=60)

#     def create(self, validated_data):
#         return PointOfInterest.objects.create(**validated_data)
    
#     def update(self, instance, validated_data):
#         instance.name = validated_data.get('name', instance.name)
#         instance.category = validated_data.get('category', instance.name)