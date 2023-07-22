from pokemon.views import PokemonViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'pokemon', PokemonViewSet, basename='pokemon')
urlpatterns = router.urls
