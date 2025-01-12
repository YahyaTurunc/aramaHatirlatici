import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  Linking,
  Image,
  StyleSheet,
} from "react-native";
import Contacts from "react-native-contacts";
import { SafeAreaView } from "react-native-safe-area-context";

const ContactsScreen = () => {
  // const testContacts = [
  // {
  //   recordID: "1",
  //   familyName: "Test User",
  //   phoneNumbers: [{ id: "1", number: "123-456-7890" }],
  // },
  // {
  //   recordID: "2",
  //   familyName: "Test User2",
  //   phoneNumbers: [{ id: "1", number: "123-456-7890" }],
  // },
  // {
  //   recordID: "3",
  //   familyName: "Test User3",
  //   phoneNumbers: [{ id: "1", number: "123-456-7890" }],
  // },
  // ];
  const [contacts, setContacts] = useState();
  useEffect(() => {
    const getContacts = async () => {
      if (Platform.OS === "android") {
        const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        );

        if (permission !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log("İzin verilmedi.");
          return;
        }
      } else if (Platform.OS === "ios") {
        const permission = await Contacts.requestPermission();

        if (permission !== "authorized") {
          console.log("İzin verilmedi.");
          return;
        }
      }

      Contacts?.getAll()
        .then((contact) => {
          setContacts(contact);
        })
        .catch((error) => {
          console.error(
            " IOS Rehber bilgileri alınırken bir hata oluştu:",
            error,
          );
        });
    };

    getContacts();
  }, []);
  const handleCall = (phoneNumber: number) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  const renderContact = ({
    item,
    i,
  }: {
    item: {
      recordID: string;
      familyName: string;
      givenName: string;
      phoneNumbers: { id: string; number: string }[];
    };
    i: number;
  }) => (
    <TouchableOpacity
      key={i}
      onPress={() => handleCall(item.phoneNumbers[0].number)}
    >
      <View
        style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          {item.familyName} {item.givenName}
        </Text>

        {item.phoneNumbers.map((phone: { id: string; number: string }) => (
          <Text key={phone.id} style={{ fontSize: 14 }}>
            {phone.number}
          </Text>
        ))}
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <View className="bg-blue-200 py-3 px-6  flex items-center justify-center">
        <Image
          source={require("@/assets/images/avatar.png")}
          style={styles.reactLogo}
        />
        <Text className="text-slate-500 dark:text-black text-lg font-bold">
          Merhaba Salih
        </Text>
      </View>

      <ThemedView>
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.recordID}
          renderItem={renderContact}
        />
      </ThemedView>
    </>
  );
};

export default ContactsScreen;
const styles = StyleSheet.create({
  reactLogo: {
    height: 50,
    width: 50,
  },
});
