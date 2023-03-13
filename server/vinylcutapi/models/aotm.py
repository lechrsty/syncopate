from django.db import models

class AOTM(models.Model):
    taste = models.ForeignKey(
        "Taste", on_delete=models.CASCADE, related_name="taste_aotm")
    album = models.ForeignKey(
        "Album", on_delete=models.CASCADE, related_name="album_aotm")
    created_on = models.DateTimeField(auto_now=True)
