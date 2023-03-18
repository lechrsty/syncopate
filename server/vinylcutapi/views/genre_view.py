from django.http import HttpResponseServerError
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import serializers, status
from vinylcutapi.models import Genre

class GenreView(ViewSet):

    def list(self, request):

        genres = Genre.objects.all().order_by('type')
        serializer = GenreSerializer(genres, many=True)
        return Response(serializer.data)

class GenreSerializer(serializers.ModelSerializer):

    class Meta:
        model = Genre
        fields = ('id', 'type',  )