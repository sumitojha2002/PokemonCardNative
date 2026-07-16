import { Stack } from "expo-router";
import React from "react";

export default function TabLaout() {
  return (
    <Stack
      screenOptions={{
        fullScreenGestureEnabled: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
        }}
      />
      <Stack.Screen name="card/[id]" />
    </Stack>
  );
}
