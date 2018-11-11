from django.urls import path

from .views import (
    CourseListView,
    CourseDetailView,
    CourseCreateView,
    CourseUpdateWordsView,
    CourseUpdateView,
    CourseDeleteView
)

urlpatterns = [
    path('', CourseListView.as_view()),
    path('create/', CourseCreateView.as_view()),
    path('<pk>/', CourseDetailView.as_view()),
    path('<pk>/updateWords/', CourseUpdateWordsView.as_view()),
    path('<pk>/update/', CourseUpdateView.as_view()),
    path('<pk>/delete/', CourseDeleteView.as_view()),
]
