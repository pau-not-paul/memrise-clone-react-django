from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('admin/', admin.site.urls),
    path('courses/', include('courses.api.urls')),
    re_path('.*', TemplateView.as_view(template_name='index.html'))
]
