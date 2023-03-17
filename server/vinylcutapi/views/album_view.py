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
        taste = Taste.objects.get(pk=request.data["taste"])

        new_album = Album.objects.create(
            title=request.data['title'],
            artist=request.data['artist'],
            description=request.data['description'],
            genre=genre,
            taste=taste,
            image_url=request.data['image_url'],
        )
        serialized = AlbumSerializer(new_album, many=False)
        return Response(serialized.data, status=status.HTTP_201_CREATED)

    def update(self, request, pk):
        """Handles PUT requests to /albums/pk
        Returns nothing with a 204."""

        album = Album.objects.get(pk=pk)

        genre_id = request.data.get("genre", {}).get("id")
        taste_id = request.data.get("taste", {}).get("id")

        genre = Genre.objects.get(pk=genre_id) if genre_id else None
        taste = Taste.objects.get(pk=taste_id) if taste_id else None

        album.title = request.data['title']
        album.artist = request.data['artist']
        album.description = request.data['description']
        album.genre=genre
        album.taste=taste
        album.image_url = request.data['image_url']
        album.save()

        return Response(None, status=status.HTTP_204_NO_CONTENT)

    def destroy(self, request, pk):
        """Handles DELETE requests to /albums/pk
        Returns nothing with a 204."""
        album = Album.objects.get(pk=pk)
        album.delete()
        return Response(None, status=status.HTTP_204_NO_CONTENT)

class GenreAlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ('id', 'type', )

class TasteAlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Taste
        fields = ('id', 'type', 'description', )

class AlbumSerializer(serializers.ModelSerializer):

    genre = GenreAlbumSerializer(many=False)
    taste = TasteAlbumSerializer(many=False)


    class Meta:
        model = Album
        fields = ('id', 'title', 'artist', 'description', 'image_url', 'genre', 'taste', )