from django.db import models

class Route(models.Model):
    name = models.CharField(max_length=120)
    