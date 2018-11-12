from django.db import models
from allauth.utils import get_user_model
from django.conf import settings
from courses.models import Course


class Profile(models.Model):
    owner = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    courses = models.ManyToManyField(Course, blank=True)
    progress = models.TextField()

    def get_courses_items(self):
        return self.courses.all()

    def __str__(self):
        if self.owner is None:
            return 'Name error'
        else:
            if type(self.owner) == str:
                return self.owner
            else:
                return self.owner.username
