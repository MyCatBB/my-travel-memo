import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { styles } from "../styles/styles";

export default function AddNote({ visible, onClose, onSave, style }) {
  const [noteText, setNoteText] = useState("");
  const [imageUri, setImageUri] = useState(null);

  if (!visible) return null;

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const saveNote = async () => {
    let savedUri = null;
    if (imageUri) {
      const filename = imageUri.split("/").pop();
      const dest = FileSystem.cacheDirectory + filename;
      await FileSystem.copyAsync({ from: imageUri, to: dest });
      savedUri = dest;
    }

    Alert.alert("Note saved!", `Note: ${noteText}`);
    if (onSave) onSave({ text: noteText, image: savedUri });

    setNoteText("");
    setImageUri(null);
    onClose();
  };

  return (
    <View style={[{ backgroundColor: "#fff", padding: 10 }, style]}>
      <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}>
        Add a Note{" "}
      </Text>

      <TextInput
        placeholder="Write your note..."
        value={noteText}
        onChangeText={setNoteText}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          marginVertical: 5,
          padding: 10,
          borderRadius: 8,
        }}
      />

      <TouchableOpacity
        style={[styles.buttonStyle, { marginVertical: 10 }]}
        onPress={pickImage}
      >
        <Text style={styles.buttonTextStyle}>Pick an Image</Text>
      </TouchableOpacity>

      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: 200, height: 200, marginTop: 10 }}
        />
      )}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          style={[styles.buttonStyle, { flex: 1, marginRight: 5 }]}
          onPress={saveNote}
        >
          <Text style={styles.buttonTextStyle}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.buttonStyle,
            { flex: 1, backgroundColor: "red", marginLeft: 5 },
          ]}
          onPress={onClose}
        >
          <Text style={styles.buttonTextStyle}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
