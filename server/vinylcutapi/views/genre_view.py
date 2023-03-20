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

    def create(self, request):
        """Handles POST requests to /genres
        Returns a serialized instance of genre with a 201"""

        new_genre = Genre.objects.create(
            type=request.data['type']
        )

        serialized = GenreSerializer(new_genre, many=False)
        return Response(serialized.data, status=status.HTTP_201_CREATED)

class GenreSerializer(serializers.ModelSerializer):

    class Meta:
        model = Genre
        fields = ('id', 'type',  )