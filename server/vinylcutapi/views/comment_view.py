from django.http import HttpResponseServerError
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import serializers, status
from vinylcutapi.models import Member, Comment, Review


class CommentView(ViewSet):
    def list(self, request):

        comments = Comment.objects.all().order_by('-created_on')

        if "review" in request.query_params:

            review = Review.objects.get(pk=request.query_params["review"])
            comments = comments.filter(review=review)

        for comment in comments:
            comment.is_member = False
            if comment.member.user == request.auth.user:
                comment.is_member = True

        serialized = CommentSerializer(comments, many=True)
        return Response(serialized.data, status=status.HTTP_200_OK)


class MemberCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ('id', 'username', 'image_url')


class CommentSerializer(serializers.ModelSerializer):

    member = MemberCommentSerializer(many=False)

    class Meta:
        model = Comment
        fields = ('id', 'member', 'body', 'created_on', 'is_member')
