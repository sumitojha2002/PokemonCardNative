import axios from "axios"
import { pokeColor, PokemonDetailInfo, pokemonResponse } from "./apitype"

const baseUrl = "https://pokeapi.co/api/v2/pokemon"

export const getAllPokemonsDefault = async (offset:number): Promise<PokemonDetailInfo[]> => {
    const response = await axios.get<pokemonResponse>(baseUrl+`?offset=${offset}&limit=${12}`);
    const resdata = await Promise.all(
        response.data.results.map(pokemon=>axios.get<PokemonDetailInfo>(pokemon.url))
    )

    return resdata.map(res=> res.data);
}

export const getColorOfThePokemon = async (id:number): Promise<pokeColor> => {
    const response = await axios.get<pokeColor>(baseUrl + `-color/${id}`)
    return response.data;
}