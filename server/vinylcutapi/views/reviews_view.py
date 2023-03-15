from django.http import HttpResponseServerError
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import serializers, status
from vinylcutapi.models import Review, Genre, Member, Rating
from rest_framework.decorators import action


class ReviewView(ViewSet):

    def list(self, request):
        """Handles get requests to /reviews
        Returns a serialized list of review instances"""

        reviews = Review.objects.all().order_by('-created_on')
        for review in reviews:
            review.is_member = False
            if review.member.user == request.auth.user:
                review.is_member = True

        # query member foreign key to get all reviews by member
        if "member" in request.query_params:

            member_instance = Member.objects.get(
                pk=request.query_params['member'])
            reviews = reviews.filter(member=member_instance)
        serialized = ReviewSerializer(reviews, many=True)

        return Response(serialized.data, status=status.HTTP_200_OK)

    # def retrieve(self, request, pk):

    #     review = Review.objects.get(pk=pk)
    #     serializer = ReviewSerializer(review)
    #     return Response(serializer.data)

    def retrieve(self, request, pk):
        """Handles get requests to /reviews/pk
        Returns a serialized object instance of review"""

        review = Review.objects.get(pk=pk)
        member = Member.objects.get(user=request.auth.user)

        review.is_member = False
        if review.member == member:
            review.is_member = True

        for comment in review.review_comment.all():
            comment.is_member = False
            if comment.member == member:
                comment.is_member = True

        serialized = ReviewSerializer(review, many=False)
        return Response(serialized.data, status=status.HTTP_200_OK)

    def create(self, request):
        """Handles POST requests to /reviews
        Returns a serialized instance of review with a 201"""

        member = Member.objects.get(user=request.auth.user)
        genre = Genre.objects.get(pk=request.data["genre"])
        rating = Rating.objects.get(pk=request.data["rating"])

        new_review = Review.objects.create(
            member=member,
            title=request.data['title'],
            artist=request.data['artist'],
            description=request.data['description'],
            genre=genre,
            rating=rating,
            image_url=request.data['image_url'],
        )
        serialized = ReviewSerializer(new_review, many=False)
        return Response(serialized.data, status=status.HTTP_201_CREATED)

    def update(self, request, pk):
        """Handles PUT requests to /reviews/pk
        Returns nothing with a 204."""

        review = Review.objects.get(pk=pk)

        genre_id = request.data["genre"]["id"]
        rating_id = request.data["rating"]["id"]

        genre = Genre.objects.get(pk=genre_id)
        rating = Rating.objects.get(pk=rating_id)

        review.title = request.data['title']
        review.artist = request.data['artist']
        review.description = request.data['description']
        review.genre=genre
        review.rating=rating
        review.image_url = request.data['image_url']
        review.save()

        return Response(None, status=status.HTTP_204_NO_CONTENT)

    def destroy(self, request, pk):
        """Handles DELETE requests to /reviews/pk
        Returns nothing with a 204."""
        review = Review.objects.get(pk=pk)
        review.delete()
        return Response(None, status=status.HTTP_204_NO_CONTENT)

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