import { Tabs } from "expo-router";
import React from "react";

export default function tabLayout() {
  return (
      <Tabs screenOptions={{ headerShown: false,  }}>
      <Tabs.Screen name="/home" />
      <Tabs.Screen name="/about" />
      <Tabs.Screen name="/support" />
    </Tabs>
  );
}
