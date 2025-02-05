from django.contrib.auth.models import Group, User
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework import permissions, viewsets

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

@csrf_exempt
def poi_list(request):
    """
    List all points of interest or create a new point of interest
    """
    if request.method == "GET":
        points_of_interest = PointOfInterest.objects.all()
        serializer = PointOfInterestSerializer(points_of_interest, many=True)
        
        return JsonResponse(serializer.data, safe=False)
    
    elif request.method == "POST":
        data = JSONParser().parse(request)
        serializer = PointOfInterestSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    
@csrf_exempt
def poi_detail(request, pk):
    """
    Retrieve, update, or delete a point of interest
    """
    try:
        poi = PointOfInterest.objects.get(pk=pk)
    except PointOfInterest.DoesNotExist:
        return HttpResponse(status=404)
    
    if request.method == 'GET':
        serializer = PointOfInterestSerializer(poi)
        return JsonResponse(serializer.data)
    
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = PointOfInterestSerializer(poi, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)
    
    elif request.method == 'DELETE':
        poi.delete()
        return HttpResponse(status=204)