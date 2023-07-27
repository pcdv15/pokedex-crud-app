from django.core.management.base import BaseCommand
from pokemon.models import Pokemon, Type, PokemonType
import requests


class Command(BaseCommand):
    """Management command for initializing Gen 1 Pokemon data"""

    def handle(self, *args, **kwargs):
        error_msg = 'Something went wrong, please try again.'

        self.stdout.write('Fetching Pokemon data...')

        try:
            # TODO: Move all external API requests to a separate service library

            # Get all Pokemon types and save to db
            pokemon_types_response = requests.get(
                'https://pokeapi.co/api/v2/type/')

            if pokemon_types_response.status_code == 200:
                pokemon_types_list = pokemon_types_response.json()
                for types in pokemon_types_list["results"]:
                    if types["name"] in ("unknown", "shadow"):
                        pass
                    else:
                        type = Type(type_name=types["name"])
                        type.save()

            # Get all 151 Gen 1 Pokemon list
            pokemon_list_response = requests.get(
                'https://pokeapi.co/api/v2/pokemon/?limit=151')

            if pokemon_list_response.status_code == 200:
                pokemon_list = pokemon_list_response.json()
                count = 1
                for pokemon in pokemon_list['results']:

                    # Get individual Pokemon details
                    pokemon_details_response = requests.get(pokemon["url"])

                    if pokemon_details_response.status_code == 200:
                        pokemon_details = pokemon_details_response.json()

                        pokemon_name = pokemon["name"]
                        pokemon_height = pokemon_details["height"] / 10
                        pokemon_weight = pokemon_details["weight"] / 10
                        pokemon_image_url = pokemon_details["sprites"]["other"]["official-artwork"]["front_default"]

                        new_pokemon = Pokemon(name=pokemon_name, height=pokemon_height,
                                              weight=pokemon_weight, image_url=pokemon_image_url)
                        new_pokemon.save()

                        self.stdout.write(
                            f'{count}. Adding {pokemon_name.capitalize()}')

                        for pokemon_types in pokemon_details["types"]:
                            pokemon_type = PokemonType(
                                type=pokemon_types["type"]["name"], pokemon=new_pokemon)
                            pokemon_type.save()

                    count += 1

            self.stdout.write(self.style.SUCCESS(
                'Successfully initialized Gen 1 Pokemon data.'))

        except Exception as e:
            self.stderr.write(error_msg)
