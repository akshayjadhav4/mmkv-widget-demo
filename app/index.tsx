import { Text, View, Platform, Button } from "react-native";
import { Paths } from "expo-file-system/next";
import { MMKV, Mode } from "react-native-mmkv";
import { ExtensionStorage } from "@bacons/apple-targets";
import { useEffect, useState } from "react";

// Get the URI of the App Group container using expo-file-system's next API
const uri =
  Paths.appleSharedContainers["group.com.example.rnmmkv.widget.demo"]?.uri;

// Convert the URI to a file system path (removes "file://" prefix)
const sharedPath = new URL(uri).pathname;

const path =
  Platform.OS === "ios"
    ? `${sharedPath}mmkv` // Ensure path includes /mmkv folder to match native MMKV behavior
    : undefined; // : On Android, react-native-mmkv will fall back to its default path, which is totally fine if as here widget is iOS-only.

const storage = new MMKV({
  id: "storage",
  mode: Mode.MULTI_PROCESS, // Required for sharing between app and extensions
  path: path,
});
export default function Index() {
  const [reload, setReload] = useState(false);
  useEffect(() => {}, [reload]);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>MMKV Demo</Text>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        {storage.getString("userName")}
      </Text>
      <Button
        title="Set UserName"
        onPress={() => {
          storage.set("userName", "USER");
          setReload(!reload);
          ExtensionStorage.reloadWidget();
        }}
      />
      <Button
        title="Delete UserName"
        onPress={() => {
          storage.delete("userName");
          setReload(!reload);
          ExtensionStorage.reloadWidget();
        }}
      />
    </View>
  );
}
