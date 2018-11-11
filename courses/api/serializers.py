from rest_framework import serializers
from courses.models import Course


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('id', 'name', 'description', 'teaching',
                  'description_language', 'words', 'owner')


class CourseUpdateWordsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('id', 'words')
