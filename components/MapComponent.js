// MapComponent.js

import React, { useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { View, Text } from "react-native";
import { styles } from "../styles/styles";

export default function MapComponent({
  markers,
  onMarkerPress,
  currentLocation,
  initialLocation,
  loadingLocation,
  mapRef,
  searchedMarker,
  favorites,
}) {
  useEffect(() => {
    if (!searchedMarker || !mapRef?.current) return;

    const { latitude, longitude } = searchedMarker.coords;
    const region = {
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    mapRef.current.animateToRegion(region, 300);
  }, [searchedMarker, mapRef]);

  if (!currentLocation) return null;

  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        ref={mapRef}
        region={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* Initial Location Marker */}
        {!loadingLocation && initialLocation && (
          <Marker
            coordinate={initialLocation}
            title="You are here"
            pinColor="blue"
          />
        )}

        {/* Search Marker: Red */}
        {searchedMarker &&
          !favorites.some((fav) => fav.id === searchedMarker.id) && (
            <Marker
              key={`search-${searchedMarker.id}`}
              coordinate={searchedMarker.coords}
              pinColor="red"
              onPress={() => onMarkerPress(searchedMarker)}
              title={searchedMarker.title || ""}
              description={searchedMarker.description || ""}
            />
          )}
        {/* Favorite Marker: Yellow */}
        {favorites.map((fav) => (
          <Marker
            key={fav.id}
            coordinate={fav.coords}
            pinColor="yellow"
            title={fav.title || ""}
            description={fav.description || ""}
            onPress={() => onMarkerPress(fav)}
          />
        ))}
        {/* default */}
        {searchedMarker &&
          !favorites.some((fav) => fav.id === searchedMarker.id) && (
            <Marker
              coordinate={searchedMarker.coords}
              title={searchedMarker.title}
              description={searchedMarker.description}
            />
          )}
      </MapView>
    </View>
  );
}
