from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from django.core import serializers
from profiles.models import Profile
from .serializers import ProfileSerializer
from courses.models import Course
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from re import sub
from rest_framework.authtoken.models import Token

class ProfileCreateView(CreateAPIView):
	queryset = Profile.objects.all()
	serializer_class = ProfileSerializer

	def get_serializer_context(self):
		return {'request': self.request}

@csrf_exempt 
def add_course(request, id, **kwargs):
	header_token = request.META.get('HTTP_AUTHORIZATION', None)
	if header_token is not None:
		try:
			token = sub('Token ', '', request.META.get('HTTP_AUTHORIZATION', None))
			token_obj = Token.objects.get(key = token)
			request.user = token_obj.user
		except Token.DoesNotExist:
			pass

	profile, status = Profile.objects.get_or_create(owner=request.user)
	course = Course.objects.filter(id=id).first()
	profile.courses.add(course)
	profile.save()

	return HttpResponse(status=204)

@csrf_exempt 
def remove_course(request, id, **kwargs):
	header_token = request.META.get('HTTP_AUTHORIZATION', None)
	if header_token is not None:
		try:
			token = sub('Token ', '', request.META.get('HTTP_AUTHORIZATION', None))
			token_obj = Token.objects.get(key = token)
			request.user = token_obj.user
		except Token.DoesNotExist:
			pass
	profile, status = Profile.objects.get_or_create(owner=request.user)
	course = Course.objects.filter(id=id).first()
	profile.courses.remove(course)
	profile.save()

	return HttpResponse(status=204)

@csrf_exempt 
def get_my_courses(request, **kwargs):
	header_token = request.META.get('HTTP_AUTHORIZATION', None)
	if header_token is not None:
		try:
			token = sub('Token ', '', request.META.get('HTTP_AUTHORIZATION', None))
			token_obj = Token.objects.get(key = token)
			request.user = token_obj.user
		except Token.DoesNotExist:
			pass
	profile, status = Profile.objects.get_or_create(owner=request.user)
	qs = profile.courses.all()
	qs_json = serializers.serialize('json', qs)

	return JsonResponse(qs_json, safe=False)
