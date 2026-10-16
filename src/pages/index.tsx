import { useEffect, useRef, useState } from "react";
import {
  Animated,
  ImageSourcePropType,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
} from "react-native";

const splashArtwork =
  require("../../Carregamento - Tela 1.2.png") as ImageSourcePropType;

type SplashScreenProps = {
  onContinue: () => void;
};

export default function SplashScreen({ onContinue }: SplashScreenProps) {
  const entrance = useRef(new Animated.Value(0)).current;
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const animation = Animated.timing(entrance, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    });

    animation.start(({ finished }) => {
      if (finished) {
        setIsReady(true);
      }
    });

    return () => animation.stop();
  }, [entrance]);

  return (
    <Pressable
      accessibilityLabel="Tela inicial CinetiX"
      accessibilityRole="button"
      onPress={onContinue}
      disabled={!isReady}
      style={styles.container}
    >
      <StatusBar hidden />
      <Animated.Image
        accessible
        accessibilityLabel="CinetiX — O Ritmo das reações"
        resizeMode="cover"
        source={splashArtwork}
        style={[
          styles.artwork,
          {
            opacity: entrance,
            transform: [
              {
                scale: entrance.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.96, 1],
                }),
              },
            ],
          },
        ]}
      />
      {isReady && (
        <Text style={styles.prompt}>Toque na tela para continuar</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#135793",
    flex: 1,
    overflow: "hidden",
  },
  artwork: {
    height: "100%",
    width: "100%",
  },
  prompt: {
    bottom: 48,
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    left: 24,
    position: "absolute",
    right: 24,
    textAlign: "center",
  },
});
