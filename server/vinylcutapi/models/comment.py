from django.db import models

class Comment(models.Model):
    review = models.ForeignKey(
        "Review", on_delete=models.CASCADE, related_name="review_comment")
    member = models.ForeignKey(
        "Member", on_delete=models.CASCADE, related_name="member_comment")
    body = models.CharField(max_length=200)
    created_on = models.DateTimeField(auto_now=True)

    @property
    def is_member(self):
        return self.__member

    @is_member.setter
    def is_member(self, value):
        self.__member = value

