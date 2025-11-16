from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import CheckUserView ,RegisterView, GoogleLogin, UpdateUserView, UserDataView

urlpatterns = [    
    # Check User existence
    path('check_user/<str:email>/', CheckUserView.as_view(), name='check-user'),
    
    # JWT Endpoint
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
        
    # OAuth with Google
    path('auth/', include('dj_rest_auth.urls')),
    path('auth/registration/', include('dj_rest_auth.registration.urls')),
    path('auth/social/', include('allauth.socialaccount.urls')),
    path('auth/google/', GoogleLogin.as_view(), name='GoogleLogin'),
    
    # Privete Endpoints
    path('user_data/', UserDataView.as_view()),
    path('update_user/', UpdateUserView.as_view(), name='update_user'),
] 