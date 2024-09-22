import { StyleSheet, View, Text } from "react-native";

export const Flag = () => {
  return (
    <View style={styles.flag}>
      <Text style={styles.flagText}>Developed by Gaops</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  flag: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: -10,
  },
  flagText: {
    color: "#fff",
  },
});
