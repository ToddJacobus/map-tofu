from django.contrib.auth.models import Group, User
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import api_view
from rest_framework.parsers import JSONParser
from rest_framework import permissions, viewsets, status
from rest_framework.response import Response

from api.api.models import PointOfInterest
from api.api.serializers import GroupSerializer, UserSerializer, PointOfInterestSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited
    """
    queryset = Group.objects.all().order_by('name')
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]

@api_view(['GET', 'POST'])
def poi_list(request, format=None):
    """
    List all points of interest or create a new point of interest
    """
    if request.method == "GET":
        points_of_interest = PointOfInterest.objects.all()
        serializer = PointOfInterestSerializer(points_of_interest, many=True)
        
        return Response(serializer.data)
    
    elif request.method == "POST":
        data = JSONParser().parse(request)
        serializer = PointOfInterestSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET', 'PUT', 'DELETE'])
def poi_detail(request, pk, format=None):
    """
    Retrieve, update, or delete a point of interest
    """
    try:
        poi = PointOfInterest.objects.get(pk=pk)
    except PointOfInterest.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = PointOfInterestSerializer(poi)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = PointOfInterestSerializer(poi, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        poi.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)