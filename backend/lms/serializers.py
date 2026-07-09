from rest_framework import serializers
from .models import User, Course

#tested with Postman, works as expected
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role']

#not tested yet
class CourseSerializer(serializers.ModelSerializer):
    teacher = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.filter(role='teacher')
    )

    class Meta:
        model = Course
        fields = ['id', 'name', 'description', 'teacher', 'students', 'is_complete']
        read_only_fields = ['students']
