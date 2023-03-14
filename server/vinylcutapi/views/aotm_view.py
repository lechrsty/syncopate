from django.http import HttpResponseServerError
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import serializers, status
from vinylcutapi.models import AOTM, Taste, Album, Genre


class AOTMView(ViewSet):

    def list(self, request):
            # get the Taste from the request query params
            taste = request.query_params.get('taste')
            
            if taste:
                # filter the AOTM queryset by the specified Taste id
                aotms = AOTM.objects.filter(taste__id=taste)
            else:
                # get all AOTMs
                aotms = AOTM.objects.all()
            
            serializer = AOTMSerializer(aotms, many=True)
            return Response(serializer.data)

    def retrieve(self, request, pk):

        aotm = AOTM.objects.get(pk=pk)
        serializer = AOTMSerializer(aotm)
        return Response(serializer.data)

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ('type', )

class AlbumAOTMSerializer(serializers.ModelSerializer):

    genre = GenreSerializer(many=False)

    class Meta:
        model = Album
        fields = ('title', 'artist', 'description', 'image_url', 'genre', )

class TasteAOTMSerializer(serializers.ModelSerializer):

    class Meta:
        model = Taste
        fields = ('type', )

class AOTMSerializer(serializers.ModelSerializer):

    taste = TasteAOTMSerializer(many=False)
    album = AlbumAOTMSerializer(many=False)

    class Meta:
        model = AOTM
        fields = ('id', 'album', 'taste', 'created_on', )