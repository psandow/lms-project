from rest_framework import serializers
from .models import User, Course

#tested with Postman, works as expected
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role']

#tested with Postman, works as expected
class CourseSerializer(serializers.ModelSerializer):
    teacher_name = serializers.CharField(source='teacher.username', read_only=True)

    class Meta:
        model = Course
        fields = ['id', 'name', 'description', 'teacher', 'teacher_name', 'students', 'is_complete']
        read_only_fields = ['students', 'teacher']
