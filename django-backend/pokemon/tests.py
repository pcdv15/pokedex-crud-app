from rest_framework.test import APITestCase
from rest_framework import status
from pokemon.models import Pokemon, Type, PokemonType
import json

# Create your tests here.


class PokemonModelViewSetTest(APITestCase):
    def setUp(self):
        # Setup test data
        Type.objects.create(type_name='grass')
        Type.objects.create(type_name='ground')
        Type.objects.create(type_name='water')

        pokemon_1 = Pokemon.objects.create(name='arceus', height=3,
                                           weight=5, image_url='https://test1.url')
        pokemon_2 = Pokemon.objects.create(name='giratina', height=6,
                                           weight=15, image_url='https://test.url')
        PokemonType.objects.create(
            type='grass', pokemon=pokemon_1)
        PokemonType.objects.create(
            type='ground', pokemon=pokemon_2)

    def test_list_pokemons(self):
        response = self.client.get('/pokemon/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 2)
        self.assertEqual(response.data['results'][0]['name'], 'arceus')
        self.assertEqual(response.data['results'][1]['name'], 'giratina')

    def test_retrieve_pokemon(self):
        pokemon = Pokemon.objects.first()

        response = self.client.get(f'/pokemon/{pokemon.id}/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'arceus')
        self.assertIsInstance(response.data['weight'], float)
        self.assertIsInstance(response.data['height'], float)
        self.assertEqual(response.data['image_url'], 'https://test1.url')
        self.assertEqual(response.data['types'][0]['type'], 'grass')

    def test_create_pokemon(self):
        payload = {
            'name': 'rayquaza',
            'height': 11.99,
            'weight': 115,
            'image_url': 'https://test3.url',
            'types': [
                {
                    'type': 'ground',
                },
                {
                    'type': 'grass'
                }
            ]
        }

        response = self.client.post(
            '/pokemon/', data=json.dumps(payload), content_type='application/json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Pokemon.objects.count(), 3)
        self.assertEqual(response.data['name'], 'rayquaza')

    def test_update_pokemon(self):
        pokemon = Pokemon.objects.first()
        payload = {
            'name': 'mudkip',
            'types': [
                {
                    'type': 'water',
                }
            ]
        }

        response = self.client.patch(
            f'/pokemon/{pokemon.id}/', data=json.dumps(payload), content_type='application/json')
        
        pokemon.refresh_from_db()

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(pokemon.name, 'mudkip')
        self.assertEqual(len(pokemon.pokemontype_set.all()), 1)

    def test_delete_pokemon(self):
        pokemon = Pokemon.objects.first()
        response = self.client.delete(f'/pokemon/{pokemon.id}/')

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Pokemon.objects.count(), 1)
        self.assertEqual(response.data, None)