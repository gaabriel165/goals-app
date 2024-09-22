import { Button, StyleSheet, View } from "react-native";
import { useState } from "react";
import { GoalInput } from "./components/GoalInput";
import { GoalItem } from "./components/GoalItem";
import { StatusBar } from "expo-status-bar";
import { Flag } from "./components/Flag";

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState("");
  const [goals, setGoals] = useState([
    { text: "Dark Souls 1", key: "1" },
    { text: "Dark Souls 2", key: "2" },
    { text: "Dark Souls 3", key: "3" },
    { text: "Sekiro", key: "4" },
    { text: "Elden Ring", key: "5" },
    { text: "Bloodborne", key: "6" },
  ]);
  const [isVisible, setIsVisible] = useState(false);

  const handleChange = (enteredText) => {
    setEnteredGoalText(enteredText);
  };

  const handleAdd = () => {
    if (enteredGoalText.length <= 2) {
      return;
    }

    setGoals((goals) => [
      ...goals,
      { text: enteredGoalText, key: Math.random().toString() },
    ]);

    setEnteredGoalText("");
    setIsVisible(false);
  };

  const handleCancel = () => {
    setIsVisible(false);
  };

  const handleDelete = (key) => {
    setGoals((goals) => {
      return goals.filter((goal) => goal.key !== key);
    });
  };  

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <View style={styles.buttonMain}>
          <Button
            title="Add new goal"
            color="#5e0acc"
            onPress={() => setIsVisible(true)}
          />
        </View>
        <GoalInput
          enteredGoalText={enteredGoalText}
          handleAdd={handleAdd}
          handleChange={handleChange}
          handleCancel={handleCancel}
          isVisible={isVisible}
        />
        <GoalItem goals={goals} onDeleteItem={handleDelete} />
      </View>
      <Flag />
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 50,
    paddingHorizontal: 16,
  },
  buttonMain: {
    padding: 16,
    marginBottom: 16,
  },
});
