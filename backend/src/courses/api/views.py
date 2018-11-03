from rest_framework.generics import ListAPIView, RetrieveAPIView

from courses.models import Course
from .serializers import CourseSerializer


class CourseListView(ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class CourseDetailView(RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
