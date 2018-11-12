from rest_framework import serializers
from profiles.models import Profile
from rest_framework.serializers import CurrentUserDefault


class ProfileSerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Profile
        fields = ('id', 'owner', 'courses', 'progress')


class ProfileUpdateProgressSerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Profile
        fields = ('id', 'progress')
