from rest_framework import serializers
from pokemon.models import Pokemon, PokemonType


class PokemonTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PokemonType
        fields = ['type']


class PokemonSerializer(serializers.ModelSerializer):
    types = PokemonTypeSerializer(source='pokemontype_set', many=True)

    class Meta:
        model = Pokemon
        exclude = ('id',)


class PokemonListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pokemon
        fields = ['id', 'name']


class PokemonRetrieveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pokemon
        fields = "__all__"
