from pokemon.models import Pokemon
from pokemon.serializers import PokemonRetrieveSerializer, PokemonSerializer, PokemonListSerializer
from rest_framework.permissions import AllowAny
from rest_framework import viewsets
from drf_spectacular.utils import extend_schema_view, extend_schema


# Create your views here.
@extend_schema_view(
    list=extend_schema(description='List all Pokemon'),
    retrieve=extend_schema(
        description="Retrieve a specific Pokemon's details"),
    create=extend_schema(description='Create a new Pokemon'),
    partial_update=extend_schema(description="Update a specific Pokemon's details"),
    destroy=extend_schema(description="Delete an existing Pokemon"),
)
class PokemonViewSet(viewsets.ModelViewSet):

    queryset = Pokemon.objects.all().order_by('id')
    serializer_class = PokemonSerializer
    permission_classes = [AllowAny,]
    http_method_names = ['get', 'post', 'patch', 'delete',]
    custom_action_serializer = {
        'list': PokemonListSerializer,
        'retrieve': PokemonRetrieveSerializer,
    }

    def get_serializer_class(self):
        if hasattr(self, 'custom_action_serializer'):
            if self.action in self.custom_action_serializer:
                return self.custom_action_serializer[self.action]

        return super(PokemonViewSet, self).get_serializer_class()
