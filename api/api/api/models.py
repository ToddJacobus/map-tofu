# from django.db import models
from django.contrib.gis.db import models

class Route(models.Model):
    name = models.CharField(max_length=120)
    color = models.CharField(max_length=60)
    geom = models.MultiLineStringField(srid=4326)

class Slope(models.Model):
    slope = models.FloatField()
    geom = models.PolygonField(srid=4326)

class Aspect(models.Model):
    aspect = models.FloatField()
    geom = models.PolygonField(srid=4326)
    