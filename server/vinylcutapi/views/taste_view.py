from django.http import HttpResponseServerError
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import serializers, status
from vinylcutapi.models import Taste

class TasteView(ViewSet):

    def list(self, request):

        tastes = Taste.objects.all()   
        serializer = TasteSerializer(tastes, many=True)

        return Response(serializer.data)

class TasteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Taste
        fields = ('id', 'type', 'description', )