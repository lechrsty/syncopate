from django.db import models

class Selection(models.Model):
    member = models.ForeignKey(
        "Member", on_delete=models.CASCADE, related_name="member_selection")
    album = models.ForeignKey(
        "Album", on_delete=models.CASCADE, related_name="album_selection")
    created_on = models.DateTimeField(auto_now=True)
