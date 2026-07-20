from rest_framework.test import APITestCase
from django.urls import reverse
from django.contrib.auth import get_user_model

User = get_user_model()


# automated version of manual Postman tests
class AuthTests(APITestCase):
    def test_student_registration(self):
        url = reverse('student_register')
        data = {
            "username": "Paul",
            "password": "Password1",
        }

        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['username'], 'Paul')
        self.assertEqual(response.data['role'], 'student')

class LoginTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="Paul",
            password="Password1",
            role="student"
        )

    def test_login(self):
        url = reverse('token_obtain_pair')
        data = {
            "username": "Paul",
            "password": "Password1"
        }

        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, 200)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
