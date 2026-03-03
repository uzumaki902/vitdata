import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Card from "@/components/Card";
import AppButton from "@/components/AppButton";
import { COLORS } from "@/constants/colors";
import * as Haptics from "expo-haptics";

function DocRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.docRow}>
      <Text style={styles.docLabel}>{label}</Text>
      <Text style={styles.docValue}>{value}</Text>
    </View>
  );
}

function SectionTitle({ children }: { children: string }) {
  return <Text style={styles.sectionTitle}>{children}</Text>;
}

export default function DashboardScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { name, email, age } = useLocalSearchParams<{
    name: string;
    email: string;
    age: string;
  }>();

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const initial = (name ?? "U").charAt(0).toUpperCase();

  const handleLogout = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.replace("/");
  };

  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={[
        styles.content,
        { paddingTop: topPad + 24, paddingBottom: bottomPad + 40 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Dashboard</Text>
        <Text style={styles.pageSubtitle}>Account</Text>
      </View>

      <SectionTitle>Profile</SectionTitle>

      <Card style={styles.profileCard}>
        <View style={styles.avatarRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>
          <View style={styles.profileText}>
            <Text style={styles.profileName}>{name ?? "User"}</Text>
            <Text style={styles.profileEmail}>{email ?? "-"}</Text>
          </View>
        </View>
      </Card>

      <SectionTitle>Details</SectionTitle>

      <Card style={styles.detailsCard}>
        <DocRow label="Email" value={email ?? "-"} />
        <View style={styles.rowDivider} />
        <DocRow label="Age" value={age ?? "-"} />
        <View style={styles.rowDivider} />
        <DocRow label="Name" value={name ?? "User"} />
      </Card>

      <View style={styles.signOutRow}>
        <AppButton
          title="Sign Out"
          onPress={handleLogout}
          variant="ghost"
        />
      </View>
    </ScrollView>
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
  pageHeader: {
    marginBottom: 32,
  },
  pageTitle: {
    fontSize: 28,
    fontFamily: "Inter_700Bold",
    color: COLORS.text,
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    color: COLORS.muted,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
    color: COLORS.muted,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  profileCard: {
    marginBottom: 32,
  },
  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: COLORS.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
    color: "#fff",
  },
  profileText: {
    flex: 1,
    gap: 4,
  },
  profileName: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    color: COLORS.text,
  },
  profileEmail: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    color: COLORS.muted,
  },
  detailsCard: {
    marginBottom: 32,
    paddingVertical: 0,
    paddingHorizontal: 20,
  },
  docRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  docLabel: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: COLORS.muted,
  },
  docValue: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    color: COLORS.text,
    flexShrink: 1,
    textAlign: "right",
    marginLeft: 16,
  },
  rowDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: -20,
  },
  signOutRow: {
    marginTop: 8,
  },
});
