import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Camera,
  CameraRuntimeError,
  useCameraDevices,
} from 'react-native-vision-camera';

export function App() {
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.back;

  const onCameraError = useCallback((error: CameraRuntimeError) => {
    console.error(`${error.code}: ${error.message}`, error.cause);
  }, []);
  const onCameraInitialized = useCallback(() => {
    console.log('Camera initialized!');
  }, []);

  if (device == null) {
    return <View style={styles.blackscreen} />;
  }

  console.log(`Camera Device: ${device.name}`);

  return (
    <View style={styles.container}>
      <Camera
        device={device}
        isActive={true}
        style={styles.camera}
        onError={onCameraError}
        onInitialized={onCameraInitialized}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blackscreen: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1, // <-- TODO: Make 1x1
  },
});