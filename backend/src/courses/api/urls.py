from django.urls import path

from .views import CourseListView, CourseDetailView

urlpatterns = [
    path('', CourseListView.as_view()),
    path('<pk>', CourseDetailView.as_view())
]