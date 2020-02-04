const SCHEME_FILMS = {
  films: {
    episode_id: 'integer',
    title: 'string',
    opening_crawl: 'string',
    director: 'string',
    producer: 'string',
    release_date: 'string',
    characters: 'array(text)',
    planets: 'array(text)',
    starships: 'array(text)',
    vehicles: 'array(text)',
    species: 'array(text)'
  }
};

const SCHEME_PEOPLE = {
  people : {
    name: 'string',
    height: 'integer',
    mass: 'integer',
    hair_color: 'string',
    skin_color: 'string',
    eye_color: 'string',
    birth_year: 'string',
    gender: 'string',
    homeworld: 'string',
    films: 'array(text)',
    species: 'array(text)',
    vehicles: 'array(text)',
    starships: 'array(text)'
  }
};

const SCHEME_PLANETS = {
  planets: {
    name: 'string',
    rotation_period: 'integer',
    orbital_period: 'integer',
    diameter: 'integer',
    climate: 'string',
    gravity: 'string',
    terrain: 'string',
    surface_water: 'integer',
    population: 'long',
    residents: 'array(text)',
    films: 'array(text)'
  }
};

const SCHEME_SPECIES = {
  species :{
    name: 'string',
    classification: 'string',
    designation: 'string',
    average_height: 'integer',
    skin_colors: 'string',
    hair_colors: 'string',
    eye_colors: 'string',
    average_lifespan: 'integer',
    homeworld: 'string',
    language: 'string',
    people: 'array(text)',
    films: 'array(text)'
  }
};

const SCHEME_STARSHIPS = {
  starships: {
    name: 'string',
    model: 'string',
    manufacturer: 'string',
    cost_in_credits: 'long',
    length: 'integer',
    max_atmosphering_speed: 'integer',
    crew: 'integer',
    passengers: 'integer',
    cargo_capacity: 'long',
    consumables: 'string',
    hyperdrive_rating: 'float',
    starship_class: 'string',
    pilots: 'array(text)',
    films: 'array(text)'
  }
};

module.exports = [
  SCHEME_FILMS,
  SCHEME_PEOPLE,
  SCHEME_PLANETS,
  SCHEME_SPECIES,
  SCHEME_STARSHIPS
];
