from django.http import HttpResponseServerError
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import serializers, status
from vinylcutapi.models import Selection, Album, Genre, Member

class SelectionView(ViewSet):

    def list(self, request):
            # get the Selection from the request query params
            member = request.query_params.get('member')
            
            if member:
                # filter the Selection queryset by the specified member id
                selections = Selection.objects.filter(member__id=member)
            else:
                # get all Selections
                selections = Selection.objects.all()
            
            serializer = SelectionSerializer(selections, many=True)
            return Response(serializer.data)

class GenreSelectionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Genre
        fields = ('type', )

class AlbumSelectionSerializer(serializers.ModelSerializer):

    genre = GenreSelectionSerializer(many=False)

    class Meta:
        model = Album
        fields = ('title', 'artist', 'description', 'image_url', 'genre', )

class MemberSelectionSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Member
        fields = ('full_name', )

class SelectionSerializer(serializers.ModelSerializer):

    album = AlbumSelectionSerializer(many=False)
    member = MemberSelectionSerializer(many=False)

    class Meta:
        model = Selection
        fields = ('id', 'member', 'album', )