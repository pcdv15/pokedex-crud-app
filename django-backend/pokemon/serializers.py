from rest_framework import serializers
from pokemon.models import Pokemon, PokemonType


class PokemonTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PokemonType
        fields = ['type']


class PokemonSerializer(serializers.ModelSerializer):
    # 'pokemontype_set' is used to reverse lookup the table relationship between Pokemon and PokemonType
    types = PokemonTypeSerializer(source='pokemontype_set', many=True)

    class Meta:
        model = Pokemon
        exclude = ('id',)
    
    # Can use drf-writable-nested package to handle nested serializer representation
    def create(self, validated_data):
        types = [data['type'] for data in validated_data.pop('pokemontype_set')]
        pokemon = Pokemon.objects.create(**validated_data)
        for type in types:
            PokemonType.objects.create(pokemon=pokemon, type=type)
        return pokemon
    
    def update(self, instance, validated_data):
        types = []
        if(validated_data.get('pokemontype_set')):
            types = [data['type'] for data in validated_data.pop('pokemontype_set')]
        instance.name = validated_data.get('name', instance.name)
        instance.height = validated_data.get('height', instance.height)
        instance.weight = validated_data.get('weight', instance.weight)
        instance.image_url = validated_data.get('image_url', instance.image_url)
        instance.save()
        
        if types:
            PokemonType.objects.filter(pokemon=instance).delete()

            for type in types:
                PokemonType.objects.create(pokemon=instance, type=type)
            
        return instance
    
    def validate_types(self, types):
        type_names = [type.get('type') for type in types]

        if len(types) <= 0:
            raise serializers.ValidationError("Must include at least one or two Pokemon types.")
        if len(types) > 2:
            raise serializers.ValidationError("Pokemon types cannot be more than two.")
        if len(type_names) != len(set(type_names)):
            raise serializers.ValidationError("Pokemon types must be unique.")

        return types



class PokemonListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pokemon
        fields = ['id', 'name']


class PokemonRetrieveSerializer(PokemonSerializer):
    class Meta:
        model = Pokemon
        fields = "__all__"
