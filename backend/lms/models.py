from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models import PROTECT


class User(AbstractUser):
    ROLE_CHOICES = [
        ('student', 'Student'),
        ('teacher', 'Teacher'),
        ('admin', 'Admin'),
    ]
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='student')

# not tested yet. on_delete PROTECT added as if required for foreign key relationships.
class Course(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    teacher = models.ForeignKey(
        User,
        on_delete=PROTECT,
        related_name='courses_taught',
        limit_choices_to={'role': 'teacher'}
    )
    students = models.ManyToManyField(
        User,
        related_name='courses_enrolled',
        limit_choices_to={'role': 'student'},
        blank=True
    )
    is_complete = models.BooleanField(default=False)

#added to make object more readable as a string.
    def __str__(self):
        return self.name
