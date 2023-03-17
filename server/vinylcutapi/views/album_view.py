from django.http import HttpResponseServerError
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import serializers, status
from vinylcutapi.models import Album, Genre, Taste


class AlbumView(ViewSet):

    def retrieve(self, request, pk):

        album = Album.objects.get(pk=pk)
        serializer = AlbumSerializer(album)
        return Response(serializer.data)


    def list(self, request):
            # get the Taste from the request query params
            taste = request.query_params.get('taste')
            
            if taste:
                # filter the Album queryset by the specified Taste id
                albums = Album.objects.filter(taste__id=taste)
            else:
                # get all albums
                albums = Album.objects.all()
            
            serializer = AlbumSerializer(albums, many=True)
            return Response(serializer.data)

    def create(self, request):
        """Handles POST requests to /albums
        Returns a serialized instance of album with a 201"""

        genre = Genre.objects.get(pk=request.data["genre"])

        new_album = Album.objects.create(
            title=request.data['title'],
            artist=request.data['artist'],
            description=request.data['description'],
            genre=genre,
            image_url=request.data['image_url'],
        )
        serialized = AlbumSerializer(new_album, many=False)
        return Response(serialized.data, status=status.HTTP_201_CREATED)

class GenreAlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ('id', 'type', )

class AlbumSerializer(serializers.ModelSerializer):

    genre = GenreAlbumSerializer(many=False)

    class Meta:
        model = Album
        fields = ('id', 'title', 'artist', 'description', 'image_url', 'genre', )