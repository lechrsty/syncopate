from django.http import HttpResponseServerError
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import serializers, status
from vinylcutapi.models import Review, Genre, Member, Rating, Comment
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

        genre_id = request.data.get("genre", {}).get("id")
        rating_id = request.data.get("rating", {}).get("id")

        genre = Genre.objects.get(pk=genre_id) if genre_id else None
        rating = Rating.objects.get(pk=rating_id) if rating_id else None

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

    @action(methods=['post'], detail=True)
    # pk here is the pk of the Review
    def comment(self, request, pk):
        member = Member.objects.get(user=request.auth.user)
        review = Review.objects.get(pk=pk)
        comment = Comment.objects.create(
            body=request.data['body'],
            member=member,
            review=review
        )

        return Response({'message': 'Comment Added'}, status=status.HTTP_201_CREATED)

    @action(methods=['delete'], detail=True)
    def delete_comment(self, request, pk):
        """pk is the pk of the comment, not the review
        """
        comment = Comment.objects.get(pk=pk)
        comment.delete()
        return Response({'message': 'Comment Deleted'}, status=status.HTTP_204_NO_CONTENT)

    @action(methods=['get'], detail=False)
    def mine(self, request):
        """pk is the pk of the comment, not the review
        """
        member_instance = Member.objects.get(user=request.auth.user)
        reviews = Review.objects.all()
        reviews = reviews.filter(member=member_instance)
        serialized = ReviewSerializer(reviews, many=True)
        return Response(serialized.data, status=status.HTTP_200_OK)

class RatingReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ('id', 'rating', )

class GenreReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ('id', 'type', )

class MemberReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ('username','image_url', )

class ReviewSerializer(serializers.ModelSerializer):
    member = MemberReviewSerializer(many=False)
    genre = GenreReviewSerializer(many=False)
    rating = RatingReviewSerializer(many=False)


    class Meta:
        model = Review
        fields = ('id', 'member', 'title', 'artist', 'description', 'genre', 'rating', 'created_on', 'image_url', 'is_member', )
        