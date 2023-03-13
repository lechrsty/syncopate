from django.db import models

class Taste(models.Model):
    type = models.CharField(max_length=20)