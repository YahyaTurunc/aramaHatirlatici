import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  PermissionsAndroid,
  Platform,
} from "react-native";
import Contacts from "react-native-contacts";

const ContactsScreen = () => {
  const [contacts, setContacts] = useState([]);

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
      }

      Contacts.getAll()
        .then((contacts) => {
          setContacts(contacts);
        })
        .catch((error) => {
          console.error("Rehber bilgileri alınırken bir hata oluştu:", error);
        });
    };

    getContacts();
  }, []);

  const renderContact = ({ item }) => (
    <View
      style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" }}
    >
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>
        {item.displayName}
      </Text>
      {item.phoneNumbers.map((phone) => (
        <Text key={phone.id} style={{ fontSize: 14 }}>
          {phone.number}
        </Text>
      ))}
    </View>
  );

  return (
    <FlatList
      data={contacts}
      keyExtractor={(item) => item.recordID}
      renderItem={renderContact}
    />
  );
};

export default ContactsScreen;
