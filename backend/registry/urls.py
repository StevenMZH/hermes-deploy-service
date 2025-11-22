# deploy/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AppViewSet, ImageViewSet, RepoViewSet, ServerViewSet

router = DefaultRouter()
router.register(r"apps", AppViewSet, basename="app")
router.register(r"images", ImageViewSet, basename="image")
router.register(r"repos", RepoViewSet, basename="repo")
router.register(r"servers", ServerViewSet, basename="server")

urlpatterns = [
    path("", include(router.urls)),
]
