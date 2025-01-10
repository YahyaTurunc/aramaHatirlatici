import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
  Alert,
  Linking,
} from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";

export default function HomeScreen() {
  const router = useRouter();

  // Bildirim izni al (daha önceki sayfalardan mı almalıyız?)
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "İzin Gerekli",
          "Bildirim göndermek için izin vermelisiniz.",
        );
      }
    };
    requestPermissions();

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.HIGH,
        sound: "default",
      });
    }
  }, []);

  // Telefon araması başlat
  const handleCall = () => {
    Linking.openURL("tel:1234567890");
  };

  // Bildirim gönder fonksiyonu
  const sendNotification = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "📱 Bildirim!",
          body: "Bu bir test bildirimidir.",
          sound: "default",
        },
        trigger: { seconds: 2 },
      });
      Alert.alert("Başarılı", "Bildirim gönderildi.");
    } catch (error) {
      Alert.alert("Hata", "Bildirim gönderilemedi.");
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView>
        {/* Arama Yap */}
        <TouchableOpacity onPress={handleCall} style={styles.button}>
          <Text style={styles.buttonText}>📞 Aramak için tıklayın</Text>
        </TouchableOpacity>

        {/* İletişim Sayfasına Git */}
        <TouchableOpacity
          onPress={() => router.replace("/intro/ContactScreen")}
          style={[styles.button, { marginTop: 10 }]}
        >
          <Text style={styles.buttonText}>📇 Kişiler Sayfası</Text>
        </TouchableOpacity>

        {/* Bildirim Gönder */}
        <TouchableOpacity
          onPress={sendNotification} // Buton tıklamasında bildirim gönder
          style={[styles.button, { backgroundColor: "#10B981", marginTop: 10 }]}
        >
          <Text style={styles.buttonText}>🔔 Bildirim Gönder</Text>
        </TouchableOpacity>

        <ThemedText style={styles.infoText}>Merhaba, Dünya! 🌍</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  button: {
    backgroundColor: "#3B82F6",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  infoText: {
    textAlign: "center",
    marginTop: 20,
    backgroundColor: "#E5E7EB",
    padding: 10,
    borderRadius: 8,
  },
});
