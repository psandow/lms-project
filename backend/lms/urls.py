from django.urls import path
from .views import AdminRegisterView, CourseEnrollView, CourseListView, MeView, StudentAvailableCoursesView, StudentCourseListView, StudentRegisterView, TeacherCourseListView, TeacherRegisterView, CourseCreateView, UserDeleteView, UserListView, CourseCompleteView, CourseUpdateView, CourseDetailView, UserDetailView, UserUpdateView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


# urlpatterns for Auth endpoints are: login (uses SimpleJWT, not Views), refresh (uses SimpleJWT, not Views), register (uses Views), and me (uses Views)
# urlpatterns for functionality to be added later are: courses (uses Views), enroll (uses Views), and complete (uses Views)

urlpatterns = [
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/register/student/', StudentRegisterView.as_view(), name='student_register'),
    path('auth/register/teacher/', TeacherRegisterView.as_view(), name='teacher_register'),
    path('auth/register/admin/', AdminRegisterView.as_view(), name='admin_register'),
    path('auth/me/', MeView.as_view(), name='me'),
    path('courses/', CourseListView.as_view(), name='course_list'),
    path('courses/create/', CourseCreateView.as_view(), name='course_create'),
    path('courses/taught/', TeacherCourseListView.as_view(), name='teacher_course_list'),
    path('courses/enrolled/', StudentCourseListView.as_view(), name='student_course_list'),
    path('courses/<int:pk>/enroll/', CourseEnrollView.as_view(), name='course-enroll'),
    path('courses/available/', StudentAvailableCoursesView.as_view(), name='student_available_courses'),
    path('users/', UserListView.as_view(), name='user_list'),
    path('courses/<int:pk>/complete/', CourseCompleteView.as_view(), name='course_complete'),
    path('courses/<int:pk>/update/', CourseUpdateView.as_view(), name='course_update'),
    path('courses/<int:pk>/', CourseDetailView.as_view(), name='course_detail'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user_detail'),
    path('users/<int:pk>/update/', UserUpdateView.as_view(), name='user_update'),
    path('users/<int:pk>/delete/', UserDeleteView.as_view(), name='user_delete'),
]