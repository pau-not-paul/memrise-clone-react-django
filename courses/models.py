from django.db import models


class Course(models.Model):
    name = models.CharField(max_length=120)
    description = models.TextField()
    teaching = models.CharField(max_length=25)
    description_language = models.CharField(max_length=25)
    words = models.TextField()
    owner = models.CharField(max_length=120)

    def __str__(self):
        return self.name
