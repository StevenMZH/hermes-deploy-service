from rest_framework import viewsets, permissions
from rest_framework.viewsets import ModelViewSet
from django.db.models import Prefetch

from .models import App, AppLocation, Image, Repo, Server
from .serializers import (
    AppSerializer,
    ImageSerializer,
    RepoSerializer,
    ServerSerializer,
)

class DefaultAllowAny(permissions.AllowAny):
    """Permite acceso público a los endpoints."""
    pass


class AppViewSet(ModelViewSet):
    permission_classes = [DefaultAllowAny]
    serializer_class = AppSerializer
    
    queryset = App.objects.all().prefetch_related(
        Prefetch(
            "locations",
            queryset=AppLocation.objects.select_related("server")
        )
    )


class ImageViewSet(viewsets.ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    permission_classes = [DefaultAllowAny]


class RepoViewSet(viewsets.ModelViewSet):
    queryset = Repo.objects.all()
    serializer_class = RepoSerializer
    permission_classes = [DefaultAllowAny]


class ServerViewSet(viewsets.ModelViewSet):
    queryset = Server.objects.all()
    serializer_class = ServerSerializer
    permission_classes = [DefaultAllowAny]
