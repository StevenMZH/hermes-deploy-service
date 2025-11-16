from rest_framework import serializers
from .models import (Owner, Location)


class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Owner
        fields = ["id", "name"]
        read_only_fields = ["id"]
        extra_kwargs = {
            "name": {"required": True, "allow_blank": False}
        }

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ["id", "name"]
        read_only_fields = ["id"]
        extra_kwargs = {
            "name": {"required": True, "allow_blank": False}
        }

