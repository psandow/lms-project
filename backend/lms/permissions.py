from rest_framework.permissions import BasePermission
from rest_framework.exceptions import PermissionDenied

#not tested yet
class IsTeacher(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'teacher'

#not tested yet
class IsStudent(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'student'

#not tested custom admin permission yet.
class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        if request.user.role != 'admin':
            raise PermissionDenied("You do not have permission to perform this action.")
        return True

#tested as working when creating a course with Postman /courses/create/ as teacher.    
class IsTeacherOrAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.role in ['teacher', 'admin']