import React, { useState, useEffect, useRef } from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
} from "react-native";
import * as Location from "expo-location";
import MapComponent from "./components/MapComponent";
import MarkerModal from "./components/MarkerModal";
import FavoritesList from "./components/FavoritesList";
import LocationSearch from "./components/LocationSearch";
import AddFavoriteButton from "./components/AddFavoriteButton";
import { styles } from "./styles/styles";

export default function App() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [searchedMarker, setSearchedMarker] = useState(null);
  const [initialLocation, setInitialLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [favoritesOpen, setFavoritesOpen] = useState(false);

  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setInitialLocation(location.coords);
      setCurrentLocation(location.coords);
      setLoadingLocation(false);
    })();
  }, []);

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
    setModalVisible(true);
  };

  const handleFavoriteSelect = (marker) => {
    setSelectedMarker(marker);
    setModalVisible(true);
  };

  const handleDeleteMarker = (markerId) => {
    setMarkers(markers.filter((m) => m.id !== markerId));
    setFavorites(favorites.filter((f) => f.id !== markerId));
    setModalVisible(false);
  };

  const handleRecenter = () => {
    if (mapRef.current && initialLocation) {
      mapRef.current.animateToRegion(
        {
          latitude: initialLocation.latitude,
          longitude: initialLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        500,
      );
    }
  };

  const handleSaveNote = (markerId, note) => {
    setFavorites((prev) =>
      prev.map((f) =>
        f.id === markerId
          ? { ...f, noteText: note.text, noteImage: note.image }
          : f,
      ),
    );
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (!modalVisible) {
          Keyboard.dismiss();
          setFavoritesOpen(false);
        }
      }}
      accessible={false}
    >
      <View style={{ flex: 1 }}>
        {/* Map */}
        <View style={{ flex: 1 }}>
          <MapComponent
            markers={markers}
            searchedMarker={searchedMarker}
            currentLocation={currentLocation}
            onMarkerPress={handleMarkerPress}
            initialLocation={initialLocation}
            loadingLocation={loadingLocation}
            mapRef={mapRef}
            favorites={favorites}
          />
          <Text style={styles.recenterButton} onPress={handleRecenter}>
            Re-center
          </Text>
        </View>

        {/* Favorite Panel */}
        <View
          style={[
            styles.favoritePanel,
            favoritesOpen
              ? styles.favoritePanelOpen
              : styles.favoritePanelClosed,
          ]}
        >
          <Text onPress={() => setFavoritesOpen((prev) => !prev)}>
            {!favoritesOpen ? `★ Favorites (${favorites.length})` : "▼ Close"}
          </Text>

          {favoritesOpen && (
            <FavoritesList
              favorites={favorites}
              onSelect={(marker) => {
                if (mapRef.current) {
                  mapRef.current.animateToRegion(
                    {
                      latitude: marker.coords.latitude,
                      longitude: marker.coords.longitude,
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01,
                    },
                    300,
                  );
                }
                setSelectedMarker(marker);
                setModalVisible(true);
              }}
            />
          )}
        </View>

        {/* MarkerModal */}
        {selectedMarker && (
          <MarkerModal
            visible={modalVisible}
            marker={selectedMarker}
            onClose={() => setModalVisible(false)}
            onDelete={handleDeleteMarker}
            onSaveNote={handleSaveNote}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        )}

        {/* Search + Add Favorite */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
        >
          <LocationSearch
            onSearch={(markerData) => {
              setSearchedMarker(markerData);
              setCurrentLocation(markerData.coords);
            }}
            searchedMarker={searchedMarker}
            favorites={favorites}
            setFavorites={setFavorites}
            renderAddFavorite={({
              style,
              searchedMarker,
              favorites,
              setFavorites,
            }) => (
              <AddFavoriteButton
                searchedMarker={searchedMarker}
                favorites={favorites}
                setFavorites={setFavorites}
                style={style}
              />
            )}
          />
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}
