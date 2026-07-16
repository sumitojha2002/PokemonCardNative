import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function about() {
  return (
    <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="flex-grow items-center py-4"
      >
        <View>
          <Text className="text-3xl">About</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default about;
