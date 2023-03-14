from django.http import HttpResponseServerError
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import serializers, status
from vinylcutapi.models import Review, Genre, Taste, Member


class ReviewView(ViewSet):

    def retrieve(self, request, pk):

        review = Review.objects.get(pk=pk)
        serializer = ReviewSerializer(review)
        return Response(serializer.data)

    def list(self, request):
            # get the Review from the request query params
            member = request.query_params.get('member')
            
            if member:
                # filter the Review queryset by the specified member id
                reviews = Review.objects.filter(member__id=member)
            else:
                # get all Reviews
                reviews = Review.objects.all()
            
            serializer = ReviewSerializer(reviews, many=True)
            return Response(serializer.data)


class GenreReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ('type', )

class MemberReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ('username','image_url', )

class ReviewSerializer(serializers.ModelSerializer):

    genre = GenreReviewSerializer(many=False)
    member = MemberReviewSerializer(many=False)

    class Meta:
        model = Review
        fields = ('id', 'member', 'title', 'artist', 'description', 'genre', 'rating', 'created_on', )