import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  mapContainer: {
    flex: 4,
    overflow: "visible",
  },
  map: {
    flex: 1,
    overflow: "visible",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
  },
  modal: {
    backgroundColor: "#edeed6ff",
    padding: 10,
    borderRadius: 10,
    width: "100%",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  favoriteItem: {
    backgroundColor: "#eee",
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  searchRow: {
    marginBottom: 10,
  },
  recenterButton: {
    position: "absolute",
    top: 40,
    right: 10,
    backgroundColor: "rgba(250, 83, 83, 0.6)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    zIndex: 10,
  },
  recenterButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonStyle: {
    height: 42,
    width: 110,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3A6FF8", // 한층 톤 다운된 파란색
    borderRadius: 10,
    marginLeft: 10,

    // 매우 자연스러운 iOS 스타일 그림자
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,

    // 버튼 안쪽 여백 약간 추가
    paddingHorizontal: 12,
  },
  textInput: {
    flex: 3,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: "#fff",
    marginBottom: 40,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  favoritePanel: {
    position: "absolute",
    top: 40,
    left: 10,
    width: 180,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 20,
  },

  favoritePanelClosed: {
    height: 33,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },

  favoritePanelOpen: {
    maxHeight: 250,
    padding: 5,
  },

  favoriteToggleText: {
    fontWeight: "bold",
  },

  buttonTextStyle: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 13,
    letterSpacing: 0.3,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
});
