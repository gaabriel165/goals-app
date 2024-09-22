import {
  View,
  Modal,
  Button,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";

export const GoalInput = ({
  handleChange,
  enteredGoalText,
  handleAdd,
  handleCancel,
  isVisible,
}) => {
  return (
    <Modal animationType="slide" visible={isVisible}>
      <View style={styles.inputContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/goal.png")}
        />
        <View style={styles.input}>
          <TextInput
            style={styles.textInput}
            placeholder="Your course goal!"
            onChangeText={handleChange}
            value={enteredGoalText}
          />
        </View>

        <View style={styles.buttonGroup}>
          <View style={styles.button}>
            <Button title="Cancel" onPress={handleCancel} color="#f31282" />
          </View>

          <View style={styles.button}>
            <Button title="Add Goal" onPress={handleAdd} color="#5e0acc" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export const styles = StyleSheet.create({
  textInput: {
    padding: 16,
    borderWidth: 2,
    borderRadius: 6,
    backgroundColor: "#e4d0ff",
    borderColor: "#e4d0ff",
    color: "#120438",
    placeholderTextColor: "#ffffff",
    fontSize: 16,
  },
  inputContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#311b6b",
  },
  input: {
    width: "100%",
    padding: 12,
  },
  buttonGroup: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  button: {
    width: "40%",
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
});
