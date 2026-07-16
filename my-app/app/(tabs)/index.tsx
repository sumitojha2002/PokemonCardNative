import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import PokemonCard from "../components/PokemonCard";
import { useQuery } from "@tanstack/react-query";
import { getAllPokemonsDefault } from "../api/api";

export default function index() {
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(1);

  const scrollRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const { data, isPending, isError, isSuccess } = useQuery({
    queryKey: ["pokemon", offset],
    queryFn: () => getAllPokemonsDefault(offset),
  });

  useEffect(() => {
    if (isSuccess) {
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true,
      });

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [data]);

  const handlePage = (value: number, c: number) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setOffset((prev) => prev + value);
      setCount((prev) => prev + c);
    });
  };

  if (isPending)
    return (
      <View className="flex-1 justify-center items-center w-[100%] h-[80px]">
        <Image
          source={require("../../assets/images/whyareyourunning.gif")}
          className="w-[130px]"
          resizeMode="contain"
        />
      </View>
    );
  if (isError)
    return (
      <View>
        <Text>Unable to fetch data</Text>
      </View>
    );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        ref={scrollRef}
        className="flex-1"
        contentContainerClassName="flex-grow items-center py-4"
      >
        <View className="items-center h-[80px] w-[80%] mb-4">
          <Image
            source={require("../../assets/images/pokemon.png")}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>

        <Animated.View
          style={{ opacity: fadeAnim }}
          className="w-full items-center gap-4"
        >
          <View className="w-full items-center gap-4">
            {data.length > 0 ? (
              data.map((item) => (
                <PokemonCard offset={offset} key={item.id} datas={item} />
              ))
            ) : (
              <Text className="text-gray-500 mt-10">
                There is no data to be found
              </Text>
            )}
          </View>
        </Animated.View>
        <View className="flex flex-row justify-evenly gap-12">
          <TouchableOpacity
            disabled={offset == 0}
            className="border p-4 rounded-md"
            onPress={() => handlePage(-12, -1)}
          >
            <Text>prev</Text>
          </TouchableOpacity>

          <View className="text-center flex justify-center">
            <Text>{count}</Text>
          </View>
          <TouchableOpacity
            className="border p-4 rounded-md"
            onPress={() => handlePage(12, 1)}
          >
            <Text>next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
