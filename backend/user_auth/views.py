from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from django.contrib.auth.models import User

from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken

from google.oauth2 import id_token as google_id_token
from google.auth.transport import requests as google_requests

from .serializers import RegisterSerializer, UpdateUser_Serializer
from .models import User


# user_data/
class UserDataView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        devices = user.devices.all()
        foreign_devices = user.foreign_devices.all()

        return Response({
            'email': user.email,
            'username': user.username,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'profile_picture': user.profile_picture,
            "date_joined": user.date_joined,
        })

class CheckUserView(APIView):
    def get(self, request, email):
        exists = User.objects.filter(email=email).exists()
        return Response({'exists': exists}, status=status.HTTP_200_OK)

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

class GoogleLogin(APIView):
    def post(self, request):
        access_token = request.data.get("access_token")
        id_token = request.data.get("id_token")

        if not access_token or not id_token:
            return Response({"detail": "Faltan datos"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            idinfo = google_id_token.verify_oauth2_token(id_token, google_requests.Request())

            email = idinfo.get("email")
            first_name = idinfo.get("given_name", "")
            last_name = idinfo.get("family_name", "")
            picture = idinfo.get("picture", "")
            
            sub = idinfo.get("sub")

            if not email:
                return Response({"detail": "No se pudo obtener el email"}, status=status.HTTP_400_BAD_REQUEST)

            user, created = User.objects.update_or_create(
                email=email,
                defaults={
                    "username": email.split("@")[0],
                    "first_name": first_name,
                    "last_name": last_name,
                    "profile_picture": picture,
                }
            )


            refresh = RefreshToken.for_user(user)
            return Response({
                "message": "Autenticado correctamente",
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            })

        except ValueError:
            return Response({"detail": "Token inválido"}, status=status.HTTP_400_BAD_REQUEST)
   

# update_user/
class UpdateUserView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        serializer = UpdateUser_Serializer(
            instance=request.user,
            data=request.data,
            partial=True,
            context={'request': request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Preferences updated successfully."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




    