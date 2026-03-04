import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, TextInputProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";

interface AppInputProps extends TextInputProps {
  label: string;
  error?: string;
  showToggle?: boolean;
}

export default function AppInput({
  label,
  error,
  showToggle,
  secureTextEntry,
  style,
  ...rest
}: AppInputProps) {
  const [hidden, setHidden] = useState(secureTextEntry ?? false);
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.row,
          focused && styles.rowFocused,
          !!error && styles.rowError,
        ]}
      >
        <TextInput
          style={[styles.input, style]}
          secureTextEntry={hidden}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholderTextColor={COLORS.muted}
          autoCapitalize="none"
          {...rest}
        />
        {showToggle && (
          <Pressable
            onPress={() => setHidden((h) => !h)}
            style={styles.toggle}
            hitSlop={8}
          >
            <Feather
              name={hidden ? "eye" : "eye-off"}
              size={16}
              color={COLORS.muted}
            />
          </Pressable>
        )}
      </View>
      {!!error && <Text style={styles.err}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
    color: COLORS.muted,
    marginBottom: 8,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.inputBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "transparent",
  },
  rowFocused: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.focusBlue,
  },
  rowError: {
    borderColor: COLORS.danger,
    backgroundColor: COLORS.dangerBg,
  },
  input: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    color: COLORS.text,
    minHeight: 48,
  },
  toggle: {
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  err: {
    color: COLORS.danger,
    marginTop: 6,
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
});
