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

class TasteMemberSerializer(serializers.ModelSerializer):

    class Meta:
        model = Taste
        fields = ('id', 'type', 'description', )

class MemberSerializer(serializers.ModelSerializer):

    taste = TasteMemberSerializer(many=False)

    class Meta:
        model = Member
        fields = ('id', 'username', 'full_name', 'bio', 'image_url',  'date_joined', 'taste', )