from django.db import models
from django.contrib.auth.models import User

class Member(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.CharField(max_length=200)
    image_url = models.CharField(max_length=100)
    taste = models.ForeignKey("Taste", on_delete=models.SET_NULL, null=True, related_name="taste_member")
    choice_one = models.ForeignKey("Album", on_delete=models.SET_NULL, null=True, related_name="first_album")
    choice_two = models.ForeignKey("Album", on_delete=models.SET_NULL, null=True, related_name="second_album")
    choice_three = models.ForeignKey("Album", on_delete=models.SET_NULL, null=True, related_name="third_album")

    @property
    def full_name(self):
        return f'{self.user.first_name} {self.user.last_name}'
    
    @property
    def date_joined(self):
        return f'{self.user.date_joined}'
    
    @property
    def username(self):
        return f'{self.user.username}'