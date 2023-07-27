# POKEDEX CRUD APP
A simple Pokedex app with CRUD functionality.
#
# Project Setup Steps
- Clone this repository and `cd` to each respective directory in a new terminal instance for the initial setup and follow the instructions below.
- Latest version of `npm`, `node`, `yarn`, `python`, and `django` is required.

## [django-backend]
1. Inside the `django-backend` directory, create a virtual environment with `python3 -m venv env`
2. Activate the virtual environment with `source env/bin/activate`
3. Install package dependencies with `pip install -r requirements.txt`
4. Create database migrations with `python manage.py makemigrations pokemon`
5. Run migrations with `python manage.py migrate`
6. Initialize Pokemon data from PokeAPI with `python manage.py initialize_pokemons`
7. Run dev server with `python manage.py runserver`

To run tests simply run `python manage.py test`. To access Swagger API docs, go to `http://localhost:8000/api/`

## [react-frontend]
1. Inside the `react-frontend` directory, install package dependencies with `yarn install`
2. Run dev server with `yarn dev`

React app client can be found in `http://localhost:8080/`
