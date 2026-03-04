import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollViewCompat } from "@/components/KeyboardAwareScrollViewCompat";
import Card from "@/components/Card";
import AppInput from "@/components/AppInput";
import AppButton from "@/components/AppButton";
import { COLORS } from "@/constants/colors";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const DUMMY_USER = {
  email: "test@mail.com",
  password: "1234",
  name: "Sai",
  age: "21",
};

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [touched, setTouched] = useState({ email: false, pass: false });

  const errors = useMemo(() => {
    const e: { email?: string; pass?: string } = {};
    if (touched.email && !EMAIL_RE.test(email.trim())) {
      e.email = "Enter a valid email address";
    }
    if (touched.pass && pass.length < 4) {
      e.pass = "Minimum 4 characters";
    }
    return e;
  }, [email, pass, touched]);

  const canLogin = EMAIL_RE.test(email.trim()) && pass.length >= 4 && !loading;

  const handleLogin = async () => {
    setTouched({ email: true, pass: true });
    setLoginError("");
    setLoading(true);

    await new Promise<void>((r) => setTimeout(r, 700));

    if (email.trim() === DUMMY_USER.email && pass.trim() === DUMMY_USER.password) {
      router.push({
        pathname: "/dashboard",
        params: { name: DUMMY_USER.name, email: email.trim(), age: DUMMY_USER.age },
      });
    } else {
      setLoginError("Incorrect email or password");
    }

    setLoading(false);
  };

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  return (
    <KeyboardAwareScrollViewCompat
      style={styles.page}
      contentContainerStyle={[
        styles.content,
        { paddingTop: topPad + 32, paddingBottom: bottomPad + 32 },
      ]}
      keyboardShouldPersistTaps="handled"
      bottomOffset={60}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Sign in</Text>
        <Text style={styles.subtitle}>Enter your credentials to continue.</Text>
      </View>

      <Card style={styles.card}>
        <AppInput
          label="Email"
          value={email}
          onChangeText={(v) => {
            setEmail(v);
            setLoginError("");
          }}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
          placeholder="you@example.com"
          keyboardType="email-address"
          error={errors.email}
        />

        <AppInput
          label="Password"
          value={pass}
          onChangeText={(v) => {
            setPass(v);
            setLoginError("");
          }}
          onBlur={() => setTouched((t) => ({ ...t, pass: true }))}
          placeholder="Min. 4 characters"
          secureTextEntry
          showToggle
          error={errors.pass}
        />

        {!!loginError && (
          <Text style={styles.loginError}>{loginError}</Text>
        )}

        <AppButton
          title="Sign In"
          onPress={handleLogin}
          disabled={!canLogin}
          loading={loading}
          style={styles.submitBtn}
        />
      </Card>

      <Text style={styles.hint}>
        Use <Text style={styles.hintMono}>test@mail.com</Text> / <Text style={styles.hintMono}>1234</Text> to sign in.
      </Text>
    </KeyboardAwareScrollViewCompat>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.base,
  },
  content: {
    paddingHorizontal: 24,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontFamily: "Inter_700Bold",
    color: COLORS.text,
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    color: COLORS.muted,
    lineHeight: 22,
  },
  card: {
    marginBottom: 24,
  },
  loginError: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    color: COLORS.danger,
    marginBottom: 12,
    marginTop: -4,
  },
  submitBtn: {
    marginTop: 8,
  },
  hint: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    color: COLORS.muted,
    textAlign: "center",
    lineHeight: 20,
  },
  hintMono: {
    fontFamily: "Inter_600SemiBold",
    color: COLORS.textSecondary,
  },
});
