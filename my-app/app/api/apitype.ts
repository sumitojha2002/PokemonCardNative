export interface pokemonResponse {
    count: number,
    next: string,
    previous: null,
    results:pokeInfo[]
}

export interface pokeInfo{
    name: string,
    url: string,
}

export interface PokemonDetailInfo {
    id: number;
    name: string;
    sprites: {
      other: {
        "official-artwork": {
          front_default: string;
        };
        "showdown": {
          front_default: string;
        }
      };
    };
    cries: {
        latest: string,
        lagecy: string
    };
    types: {
      slot: number;
      type: {
        name: string;
      };

    }[];
  }
  
export interface pokeColor {
    name: string,
}