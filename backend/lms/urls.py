from django.urls import path
from .views import CourseListView, MeView, StudentCourseListView, StudentRegisterView, TeacherCourseListView, TeacherRegisterView, CourseCreateView, UserListView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


# urlpatterns for Auth endpoints are: login (uses SimpleJWT, not Views), refresh (uses SimpleJWT, not Views), register (uses Views), and me (uses Views)
# urlpatterns for functionality to be added later are: courses (uses Views), enroll (uses Views), and complete (uses Views)

urlpatterns = [
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/register/student/', StudentRegisterView.as_view(), name='student_register'),
    path('auth/register/teacher/', TeacherRegisterView.as_view(), name='teacher_register'),
    path('auth/me/', MeView.as_view(), name='me'),
    path('courses/', CourseListView.as_view(), name='course_list'),
    path('courses/create/', CourseCreateView.as_view(), name='course_create'),
    path('courses/taught/', TeacherCourseListView.as_view(), name='teacher_course_list'),
    path('courses/enrolled/', StudentCourseListView.as_view(), name='student_course_list')
]