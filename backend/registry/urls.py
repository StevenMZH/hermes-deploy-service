from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.routers import DefaultRouter
from .views import OwnerViewSet, LocationViewSet

router = DefaultRouter()
router.register(r'owners', OwnerViewSet, basename='owner')
router.register(r'locations', LocationViewSet, basename='location')

urlpatterns = [
    path("", include(router.urls)),
]
