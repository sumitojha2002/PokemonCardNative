import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { getColorOfThePokemon } from "../api/api";
import { PokemonDetailInfo } from "../api/apitype";

const POKEMON_PASTEL_COLORS: Record<string, string> = {
  red: "#FEE2E2",
  blue: "#DBEAFE",
  green: "#D1FAE5",
  yellow: "#FEF3C7",
  purple: "#F3E8FF",
  pink: "#FCE7F3",
  brown: "#EDDCD2",
  gray: "#F3F4F6",
  white: "#F9FAFB",
  black: "#E5E7EB",
};

type PokemonCardProps = {
  datas: PokemonDetailInfo;
  offset: number;
};

export default function PokemonCard({ datas, offset }: PokemonCardProps) {
  const router = useRouter();
  const title = datas.name.charAt(0).toUpperCase() + datas.name.slice(1);

  const { data } = useQuery({
    queryKey: ["pokeColor", datas.id],
    queryFn: () => getColorOfThePokemon(datas.id),
  });

  // 2. Extract the raw color string from the API (lowercase it to safely match keys)
  const rawColor = data?.name?.toLowerCase() || "white";

  // 3. Fallback to white if the API returns a color not defined in our dictionary
  const backgroundColor = POKEMON_PASTEL_COLORS[rawColor] || "#FFFFFF";

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/(tabs)/home/card/[id]",
          params: {
            id: datas.id.toString(),
            title: datas.name,
            offset: offset,
          },
        })
      }
      className="w-10/12 border border-gray-300 rounded-xl p-9 mb-4 shadow-sm"
      style={{ backgroundColor }} // 4. Apply the soft pastel color here
    >
      <View className="flex-col items-center gap-4">
        <View className="border border-dashed border-gray-400 w-[270px] h-[400px] rounded-lg justify-center items-center">
          <Image
            source={{
              uri: datas.sprites.other["official-artwork"].front_default,
            }}
            style={{ width: 150, height: 150 }}
          />
        </View>

        <View className="flex w-full gap-1">
          <Text className="text-lg font-bold text-gray-800">{title}</Text>
          <View className="flex-1 flex-row gap-2">
            {datas.types.map((d, index) => (
              <Text
                key={index}
                className="text-sm text-gray-600 border p-2 rounded-md"
              >
                {d.type.name}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
