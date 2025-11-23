import React, { useState, useEffect } from "react";
import {
  TextInput,
  TouchableOpacity,
  Text,
  Keyboard,
  Animated,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import { styles } from "../styles/styles";

export default function LocationSearch({
  onSearch,
}) {
  const [address, setAddress] = useState("");
  const [keyboardHeight] = useState(new Animated.Value(0));
  const [inputFocused, setInputFocused] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", (e) => {
      Animated.timing(keyboardHeight, {
        toValue: e.endCoordinates.height,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });
    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      Animated.timing(keyboardHeight, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleSearch = async () => {
    if (!address) return;

    try {
      const results = await Location.geocodeAsync(address);
      if (results.length > 0) {
        const { latitude, longitude } = results[0];
        const placeInfo = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });
        const place = placeInfo[0];
        const fullAddress =
          `${place.street || ""} ${place.city || ""} ${place.region || ""}`.trim();

        onSearch({
          id: Date.now(),
          coords: { latitude, longitude },
          title: address,
          address: fullAddress,
          description: fullAddress,
        });
      } else {
        Alert.alert("Place not found");
      }
    } catch (error) {
      Alert.alert("Error searching place", error.message);
    }
  };

  return (
    <Animated.View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 5,
        marginBottom: keyboardHeight,
      }}
    >
      <TextInput
        style={[styles.textInput, { flex: 3, marginRight: 5 }]}
        placeholder="Enter location"
        value={address}
        onChangeText={setAddress}
        onFocus={() => setInputFocused(true)}
        onBlur={() => setInputFocused(false)}
      />

      <TouchableOpacity
        style={[styles.buttonStyle, { marginRight: 5, marginBottom: 40 }]}
        onPress={handleSearch}
      >
        <Text style={styles.buttonTextStyle}>Search</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
