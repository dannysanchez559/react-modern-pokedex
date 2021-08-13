# PocketDex

Responsive Pokedex app with infinite scroll, search, filtering, and sorting functionalities. Displays Pokemon data(species info, moves, evolutions, and base stats) provided by [PokeAPI](https://pokeapi.co/docs/v2) and cached with [pokeapi-js-wrapper](https://github.com/PokeAPI/pokeapi-js-wrapper).

## Project Requirements

- Node version v.12.0.0+.

### Project Setup

- Install required packages
    - Navigate project's root directory
    - Type and run `npm install`

### Running the Project

- Navigate to project directory in terminal

- Install packages via `npm install`

- Open development server via `npm start`

### Development Process

- When starting work on a new release version, increment `minor` version(example: 1.2.0 to 1.3.0)

## Deployment Instructions

- Install Firebase CLI by running `npm install -g firebase-tools`

- Create project on Firebase console

- In project's root directory, login via `firebase login` command

- Initialize Firebase project via `firebase init`

- Create `build` by runing `npm run build`

- Run `firebase deploy`

- For more info about hosting with Firebase, check out the [official Firebase documentation](https://firebase.google.com/docs/hosting/quickstart)



