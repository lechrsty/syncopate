from django.http import HttpResponseServerError
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import serializers, status
from vinylcutapi.models import Member, Taste, Album, Genre


class MemberView(ViewSet):

    def list(self, request):

        members = Member.objects.all()
        serializer = MemberSerializer(members, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk):

        member = Member.objects.get(pk=pk)
        serializer = MemberSerializer(member)
        return Response(serializer.data)

    # Update Taste
    def update(self, request, pk):
        """Handles PUT requests to /members/pk
        Returns nothing with a 204."""

        member = Member.objects.get(pk=pk)

        taste_data = request.data.get("taste")
        taste_id = taste_data.get("id") if taste_data else None

        taste = Taste.objects.get(pk=taste_id) if taste_id else None
        member.taste = taste
        member.save()

        return Response(None, status=status.HTTP_204_NO_CONTENT)

    # Update Selections
    def update_selections(self, request, pk):
        """Handles PUT requests to /members/pk/selections
        Returns nothing with a 204."""

        member = Member.objects.get(pk=pk)

        choice_one_data = request.data.get("choice_one")
        choice_one_id = choice_one_data.get("id") if choice_one_data else None
        choice_one = Album.objects.get(pk=choice_one_id) if choice_one_id else None

        choice_two_data = request.data.get("choice_two")
        choice_two_id = choice_two_data.get("id") if choice_two_data else None
        choice_two = Album.objects.get(pk=choice_two_id) if choice_two_id else None

        choice_three_data = request.data.get("choice_three")
        choice_three_id = choice_three_data.get("id") if choice_three_data else None
        choice_three = Album.objects.get(pk=choice_three_id) if choice_three_id else None

        member.choice_one = choice_one
        member.choice_two = choice_two
        member.choice_three = choice_three
        member.save()

        return Response(None, status=status.HTTP_204_NO_CONTENT)

class TasteMemberSerializer(serializers.ModelSerializer):

    class Meta:
        model = Taste
        fields = ('id', 'type', 'description', )

class GenreMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ('id', 'type', )

class AlbumMemberSerializer(serializers.ModelSerializer):

    genre = GenreMemberSerializer(many=False)

    class Meta:
        model = Album
        fields = ('id', 'title', 'artist', 'description', 'genre', 'image_url', )

class MemberSerializer(serializers.ModelSerializer):

    taste = TasteMemberSerializer(many=False)
    choice_one = AlbumMemberSerializer(many=False)
    choice_two = AlbumMemberSerializer(many=False)
    choice_three = AlbumMemberSerializer(many=False)


    class Meta:
        model = Member
        fields = ('id', 'username', 'full_name', 'bio', 'image_url', 'choice_one', 'choice_two', 'choice_three', 'date_joined', 'taste', )