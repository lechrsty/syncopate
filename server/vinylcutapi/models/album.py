from django.db import models

class Album(models.Model):
    title = models.CharField(max_length=50)
    artist = models.CharField(max_length=50)
    description = models.CharField(max_length=200)
    image_url = models.CharField(max_length=200)
    genre = models.ForeignKey(
        "Genre", on_delete=models.SET_NULL, null=True, related_name="genre_album")
    taste = models.ForeignKey(
        "Taste", on_delete=models.SET_NULL, null=True, related_name="taste_album")