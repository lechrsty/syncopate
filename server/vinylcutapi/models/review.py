from django.db import models
from vinylcutapi.models import Member

class Review(models.Model):
    member = models.ForeignKey(
        "Member", on_delete=models.CASCADE, related_name="member_review")
    title = models.CharField(max_length=50)
    artist = models.CharField(max_length=50)
    description = models.CharField(max_length=1000)
    genre = models.ForeignKey(
        "Genre", on_delete=models.SET_NULL, null=True, related_name="genre_review")
    rating = models.ForeignKey(
        "Rating", on_delete=models.SET_NULL, null=True, related_name="rating_review")
    image_url = models.CharField(max_length=200)
    created_on = models.DateTimeField(auto_now=True)
    approved = models.BooleanField(default=True)

    @property
    def is_member(self):
        return self.__member

    @is_member.setter
    def is_member(self, value):
        self.__member = value

    @property
    def member_comments(self):
        return self.__member

    @member_comments.setter
    def member_comments(self, value):
        self.__member = value
