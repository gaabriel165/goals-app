import { useState, useRef } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Pressable,
  Animated,
  Dimensions,
} from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";

const SCREEN_WIDTH = Dimensions.get("window").width;

const FlatItem = ({ itemData, onDeleteItem, setScrollEnabled }) => {
  const translationX = useRef(new Animated.Value(0)).current;
  const [currentTranslationX, setCurrentTranslationX] = useState(0);

  const handleGesture = Animated.event(
    [{ nativeEvent: { translationX: translationX } }],
    {
      useNativeDriver: false,
      listener: (event) => {
        setCurrentTranslationX(event.nativeEvent.translationX);
      },
    }
  );

  const handleGestureEnd = (key) => {
    setScrollEnabled(true);

    if (currentTranslationX < SCREEN_WIDTH * 0.5) {
      Animated.spring(translationX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();

      return;
    }

    onDeleteItem(key);
  };

  const setInitialPosition = () => {
    Animated.spring(translationX, {
      toValue: 0,
      useNativeDriver: true,
    }).start();

    setScrollEnabled(true);
  };

  return (
    <GestureHandlerRootView>
      <PanGestureHandler
        onGestureEvent={handleGesture}
        onCancelled={setInitialPosition}
        onFailed={setInitialPosition}
        onActivated={() => setScrollEnabled(false)}
        onBegan={() => setScrollEnabled(false)}
        onEnded={() => handleGestureEnd(itemData.item?.key)}
      >
        <Animated.View
          style={[
            styles.taskItem,
            { transform: [{ translateX: translationX }] },
          ]}
        >
          <View style={styles.goal}>
            <Pressable android_ripple={{ color: "#32066d" }}>
              <Text style={styles.goalText}>{itemData.item?.text}</Text>
            </Pressable>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export const GoalItem = ({ goals, onDeleteItem }) => {
  const [scrollEnabled, setScrollEnabled] = useState(true);

  return (
    <View style={styles.goalsContainer}>
      <FlatList
        keyExtractor={(item) => item.key}
        data={goals}
        scrollEnabled={scrollEnabled}
        renderItem={(itemData) => {
          return (
            <FlatItem
              itemData={itemData}
              onDeleteItem={onDeleteItem}
              setScrollEnabled={setScrollEnabled}
            />
          );
        }}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  goalsContainer: {
    flex: 5,
  },
  goal: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: "#6d19db",
    elevation: 3,
  },
  goalText: {
    color: "#ffffff",
    padding: 12,
    fontSize: 16,
    fontWeight: "600",
  },
});
