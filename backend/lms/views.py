from django.shortcuts import render
from .permissions import IsAdmin, IsTeacher
from rest_framework import generics
from .models import User, Course
from .serializers import UserSerializer, CourseSerializer
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

# tested with Postman, works as expected (POST /api/auth/register/student/ with JSON body {"username": "Lisa", "password": "Password1"}
class StudentRegisterView(generics.CreateAPIView):
    queryset = User.objects.filter(role='student')
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        serializer.save(password=make_password(self.request.data.get('password')), role='student')

# tested with Postman, works as expected (GET /api/auth/me/ with Authorization header "Bearer <access_token
class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "id": request.user.id,
            "username": request.user.username,
            "role": request.user.role
        })

#not tested yet. Need to add urls
class CourseCreateView(generics.CreateAPIView):
    serializer_class = CourseSerializer
    permission_classes = [IsTeacher | IsAdmin]

#not tested yet. Need to add urls
class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdmin]