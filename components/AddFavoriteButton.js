import React from "react";
import { TouchableOpacity, Text, Alert } from "react-native";
import { styles } from "../styles/styles";

export default function AddFavoriteButton({
  searchedMarker,
  favorites,
  setFavorites,
  style,
}) {
  const handleAddFavorite = () => {
    if (!searchedMarker) {
      Alert.alert("Please search a location first");
      return;
    }

    // duplicate check by id
    const alreadyExists = favorites.some((fav) => fav.id === searchedMarker.id);
    if (alreadyExists) {
      Alert.alert("This place is already in favorites");
      return;
    }

    // Add to favorites
    setFavorites([...favorites, searchedMarker]);
  };

  return (
    <TouchableOpacity
      style={[style, !searchedMarker && { backgroundColor: "#aaa" }]}
      onPress={handleAddFavorite}
    >
      <Text style={styles.buttonTextStyle}>Add Favorite</Text>
    </TouchableOpacity>
  );
}
