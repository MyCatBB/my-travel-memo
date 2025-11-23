import React, { useState } from "react";
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { styles } from "../styles/styles";
import AddFavoriteButton from "./AddFavoriteButton";

export default function MarkerModal({
  visible,
  marker,
  onClose,
  onDelete,
  onSaveNote,
  favorites, 
  setFavorites,
}) {
  const [addNoteVisible, setAddNoteVisible] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [imageUri, setImageUri] = useState(null);

  React.useEffect(() => {
    if (marker) {
      setNoteText(marker.noteText || "");
      setImageUri(marker.noteImage || null);
    }
  }, [marker]);

  const saveNote = () => {
    if (onSaveNote) {
      onSaveNote(marker.id, { text: noteText, image: imageUri });
    }
    setAddNoteVisible(false);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) setImageUri(result.assets[0].uri);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
          paddingTop: 90,
        }}
      >
        <View
          style={[styles.modal, { maxHeight: addNoteVisible ? "80%" : "auto" }]}
        >
          <Text style={styles.modalTitle}>Name: {marker?.title || ""}</Text>
          <Text>Address: {marker?.description || ""}</Text>

          {marker?.noteText ? <Text>Note: {marker.noteText}</Text> : null}
          {marker?.noteImage && (
            <Image
              source={{ uri: marker.noteImage }}
              style={{ width: 200, height: 200, marginTop: 10 }}
            />
          )}

          <View
            style={[
              styles.buttonRow,
              {
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              },
            ]}
          >
            <TouchableOpacity
              style={[styles.buttonStyle, { flex: 1.4, marginRight: 0.1 }]}
              onPress={() => setAddNoteVisible(!addNoteVisible)}
            >
              <Text style={styles.buttonTextStyle}>Add Note</Text>
            </TouchableOpacity>

            <AddFavoriteButton
              searchedMarker={marker} 
              favorites={favorites} 
              setFavorites={setFavorites} 
              style={[styles.buttonStyle, { flex: 1.4, marginRight: 0.1 }]}
            />

            <TouchableOpacity
              style={[styles.buttonStyle, { flex: 1.4, marginRight: 0.1 }]}
              onPress={() => onDelete(marker.id)}
            >
              <Text style={styles.buttonTextStyle}>Delete</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.buttonStyle, { flex: 1.4, marginRight: 0.1 }]}
              onPress={() => {
                setAddNoteVisible(false); 
                onClose(); 
              }}
            >
              <Text style={styles.buttonTextStyle}>Close</Text>
            </TouchableOpacity>
          </View>

          {addNoteVisible && (
            <ScrollView style={{ marginTop: 10, maxHeight: 250 }}>
              <TextInput
                style={styles.input}
                placeholder="Write your note..."
                value={noteText}
                onChangeText={setNoteText}
              />

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
                  marginTop: 10,
                }}
              >
                {/* Pick Image */}
                <TouchableOpacity
                  style={[styles.buttonStyle, { flex: 1, marginRight: 5 }]}
                  onPress={pickImage}
                >
                  <Text style={styles.buttonTextStyle}>Pick Image</Text>
                </TouchableOpacity>

                {/* Save */}
                <TouchableOpacity
                  style={[styles.buttonStyle, { flex: 1, marginHorizontal: 5 }]}
                  onPress={saveNote}
                >
                  <Text style={styles.buttonTextStyle}>Save</Text>
                </TouchableOpacity>

                {/* Cancel */}
                <TouchableOpacity
                  style={[
                    styles.buttonStyle,
                    { flex: 1, backgroundColor: "red", marginLeft: 5 },
                  ]}
                  onPress={() => setAddNoteVisible(false)}
                >
                  <Text style={styles.buttonTextStyle}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
