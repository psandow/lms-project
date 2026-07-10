from django.shortcuts import render
from .permissions import IsAdmin, IsStudent, IsTeacher, IsTeacherOrAdmin
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

#tested with Postman.
class TeacherRegisterView(generics.CreateAPIView):
    queryset = User.objects.filter(role='teacher')
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        serializer.save(password=make_password(self.request.data.get('password')), role='teacher')

# tested with Postman, works as expected (GET /api/auth/me/ with Authorization header "Bearer <access_token
class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "id": request.user.id,
            "username": request.user.username,
            "role": request.user.role
        })

#need to test. need to create register admin first.
class CourseListView(generics.ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAdmin]

#GET request to /courses/taught/ with Authorization header "Bearer <access_token" and no body. Tested with Postman, works as expected. Returns a list of courses taught by the authenticated teacher.
class TeacherCourseListView(generics.ListAPIView):
    serializer_class = CourseSerializer
    permission_classes = [IsTeacher]

    def get_queryset(self):
        return Course.objects.filter(teacher=self.request.user)

#GET request to /courses/enrolled/ with Authorization header "Bearer <access_token" and no body. Tested with Postman, works as expected. Returns a list of courses the authenticated student is enrolled in.
class StudentCourseListView(generics.ListAPIView):
    serializer_class = CourseSerializer
    permission_classes = [IsStudent]

    def get_queryset(self):
        return Course.objects.filter(students=self.request.user)

#tested with Postman /courses/create/ with Authorization header "Bearer <access_token" and JSON body {"name": "Test course name 1", "description": "Test course description 1", "teacher": 3}
class CourseCreateView(generics.CreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsTeacherOrAdmin]

    def perform_create(self, serializer):
        serializer.save()

#not tested yet. Need to add urls
class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdmin]

#PUT request to /courses/<int:pk>/enroll/ with Authorization header "Bearer <access_token" and no body. Tested with Postman, works as expected. Enrolls the authenticated student in the course with the given pk.
class CourseEnrollView(generics.UpdateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsStudent]

    def update(self, request, *args, **kwargs):
        course = self.get_object()
        course.students.add(request.user)
        course.save()
        return Response({"detail": "Enrolled successfully"})


