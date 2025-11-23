import React from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles/styles";

export default function FavoritesList({ favorites, onSelect }) {
  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.favoriteItem}
          onPress={() => onSelect(item)}
        >
          <Text>{item.title}</Text>
        </TouchableOpacity>
      )}
    />
  );
}
