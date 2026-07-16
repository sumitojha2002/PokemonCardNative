import { PokemonDetailInfo } from "@/app/api/apitype";
import { useQueryClient } from "@tanstack/react-query";
import { Audio } from "expo-av";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DetailCard() {
  const query = useQueryClient();

  const { id, title, offset } = useLocalSearchParams() as {
    id: string;
    title: string;
    offset: string;
  };

  const offsetNumber = Number(offset);
  const pokiId = Number(id);

  const pokemon = query
    .getQueryData<PokemonDetailInfo[]>(["pokemon", offsetNumber])
    ?.find((poki) => poki.id === pokiId);

  const playCry = async (): Promise<void> => {
    const { sound } = await Audio.Sound.createAsync({
      uri: pokemon?.cries.latest,
    });

    await sound.playAsync();
  };
  const stackTitle = title.charAt(0).toUpperCase() + title.slice(1);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Stack.Screen options={{ title: stackTitle }} />
      <ScrollView className="flex-1">
        <View className="items-center pb-10">
          <View className="w-[270px] h-[400px] rounded-lg justify-center items-center">
            <Image
              source={{
                uri: pokemon?.sprites.other.showdown.front_default,
              }}
              className="w-full h-full"
              resizeMode="contain"
            />
            <TouchableOpacity
              onPress={playCry}
              className="border p-2 rounded-md"
            >
              <Text>Sound</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
