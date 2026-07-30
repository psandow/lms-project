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

#tested with Postman. Note open admin registeration. Should restrict?
class AdminRegisterView(generics.CreateAPIView):
    queryset = User.objects.filter(role='admin')
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        serializer.save(password=make_password(self.request.data.get('password')), role='admin')

# tested with Postman, works as expected (GET /api/auth/me/ with Authorization header "Bearer <access_token
class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "id": request.user.id,
            "username": request.user.username,
            "role": request.user.role,
            "email": request.user.email
        })

#GET request to /courses/ with Authorization header "Bearer <access_token" and no body. Tested with Postman, works as expected. Returns a list of all courses.
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
    permission_classes = [IsTeacher]

    def perform_create(self, serializer):
        serializer.save(teacher=self.request.user)

class CourseCreateViewAdmin(generics.CreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAdmin]

    def perform_create(self, serializer):
        serializer.save()

#tested with Postman, works as expected. GET request to /users/
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

class CourseUnenrollView(generics.UpdateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsStudent]

    def update(self, request, *args, **kwargs):
            course = self.get_object()
            course.students.remove(request.user)
            course.save()
            return Response({"detail": "Unenrolled successfully"})

#GET request tested with two students to shows all courses that the student is not enrolled in. GET request to /courses/available/
# edit: changed to show all courses and frontend manage what to show based on enrolled.
class StudentAvailableCoursesView(generics.ListAPIView):
    serializer_class = CourseSerializer
    permission_classes = [IsStudent]

    def get_queryset(self):
        user = self.request.user
        return Course.objects.all()

#PUT request to /courses/1/complete/ with Authorization header "Bearer <access_token" and no body. Tested with Postman, works as expected. Marks the course with the given pk as complete.
class CourseCompleteView(generics.UpdateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsTeacherOrAdmin]

    def update(self, request, *args, **kwargs):
        course = self.get_object()
        course.is_complete = True
        course.save()
        return Response(self.get_serializer(course).data)

#PATCH request to /courses/1/update/ with Authorization header "Bearer <access_token" and JSON body {"description": "Updated course description"}. Tested with Postman, works as expected. Updates the course with the given pk.
class CourseUpdateView(generics.UpdateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsTeacherOrAdmin]

#tested with frontend
class CourseDetailView(generics.RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]

#tested with frontend
class CourseDeleteView(generics.DestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsTeacherOrAdmin]

class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdmin]

class UserUpdateView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdmin]

class UserDeleteView(generics.DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdmin]

class TeacherListView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAdmin]

    def get_queryset(self):
        return User.objects.filter(role="teacher")