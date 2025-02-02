from vectortiles import VectorLayer

from api.models import Route, Slope, Aspect

class RouteVectorLayer(VectorLayer):
    model = Route
    id = "routes"
    tile_fields = ('name', 'color')
    min_zoom = 10

class SlopeVectorLayer(VectorLayer):
    model = Slope
    id = "slope"
    tile_fields = ('slope')
    min_zoom = 10

class AspectVectorLayer(VectorLayer):
    model = Aspect
    id = "aspect"
    tile_fields = ('aspect')
    min_zoom = 10