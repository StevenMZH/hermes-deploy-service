from rest_framework import viewsets
from .models import Owner, Location
from .serializers import OwnerSerializer, LocationSerializer

class OwnerViewSet(viewsets.ModelViewSet):
    queryset = Owner.objects.all().order_by('name')
    serializer_class = OwnerSerializer

class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all().order_by('name')
    serializer_class = LocationSerializer
