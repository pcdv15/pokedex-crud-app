from django.db import models
from django.core.exceptions import ValidationError

# Create your models here.


class Pokemon(models.Model):
    name = models.CharField(max_length=100)
    height = models.FloatField(max_length=10, help_text="Height in meters.")
    weight = models.FloatField(max_length=10, help_text="Weight in kilograms.")
    image_url = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.name.capitalize()


class Type(models.Model):
    type_name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.type_name


class PokemonType(models.Model):

    pokemon = models.ForeignKey(Pokemon, on_delete=models.CASCADE)
    type = models.CharField(max_length=100)

    def clean(self):
        if not Type.objects.filter(type_name=self.type).exists():
            raise ValidationError(
                f'Type "{self.type}" is not a valid Pokemon type.')

    def save(self, *args, **kwargs):
        self.clean()
        super(PokemonType, self).save(*args, **kwargs)
