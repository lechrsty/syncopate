from django.http import HttpResponseServerError
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import serializers, status
from vinylcutapi.models import Member, Taste


class MemberView(ViewSet):

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

class TasteMemberSerializer(serializers.ModelSerializer):

    class Meta:
        model = Taste
        fields = ('id', 'type', 'description', )

class MemberSerializer(serializers.ModelSerializer):

    taste = TasteMemberSerializer(many=False)

    class Meta:
        model = Member
        fields = ('id', 'username', 'full_name', 'bio', 'image_url', 'choice_one', 'choice_two', 'choice_three', 'date_joined', 'taste', )