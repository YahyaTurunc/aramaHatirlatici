import { Stack } from "expo-router";

export default function IntroLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Başlıkları gizle
      }}
    >
      <Stack.Screen name="ContactScreen" options={{ headerShown: true , title: 'Seçim'}}/>
    </Stack>
  );
}
