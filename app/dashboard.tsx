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
import { Feather } from "@expo/vector-icons";
import Card from "@/components/Card";
import AppButton from "@/components/AppButton";
import { COLORS } from "@/constants/colors";
import * as Haptics from "expo-haptics";

function StatCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <View style={styles.statCard}>
      <View style={styles.statIconWrap}>
        <Feather name={icon as any} size={16} color={COLORS.accent} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function DocRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <View style={styles.docRow}>
      <View style={styles.docLeft}>
        <Feather name={icon as any} size={14} color={COLORS.muted} />
        <Text style={styles.docLabel}>{label}</Text>
      </View>
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
  const displayName = name ?? "User";

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
      {/* Greeting header */}
      <View style={styles.pageHeader}>
        <Text style={styles.greeting}>Welcome back,</Text>
        <Text style={styles.pageTitle}>{displayName} </Text>
      </View>

      {/* Quick stats row */}
      <View style={styles.statsRow}>
        <StatCard icon="shield" label="Status" value="Active" />
        <StatCard icon="clock" label="Member" value="New" />
        <StatCard icon="star" label="Plan" value="Free" />
      </View>

      {/* Profile section */}
      <SectionTitle>Profile</SectionTitle>

      <Card style={styles.profileCard}>
        <View style={styles.avatarRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>
          <View style={styles.profileText}>
            <Text style={styles.profileName}>{displayName}</Text>
            <Text style={styles.profileEmail}>{email ?? "-"}</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Verified</Text>
          </View>
        </View>
      </Card>

      {/* Details section */}
      <SectionTitle>Account Details</SectionTitle>

      <Card style={styles.detailsCard}>
        <DocRow icon="mail" label="Email" value={email ?? "-"} />
        <View style={styles.rowDivider} />
        <DocRow icon="user" label="Name" value={displayName} />
        <View style={styles.rowDivider} />
        <DocRow icon="calendar" label="Age" value={age ?? "-"} />
        <View style={styles.rowDivider} />
        <DocRow icon="globe" label="Region" value="India" />
      </Card>

      {/* Sign out */}
      <View style={styles.signOutRow}>
        <AppButton
          title="Sign Out"
          onPress={handleLogout}
          variant="ghost"
        />
      </View>

      <Text style={styles.footerHint}>Inova v1.0.0</Text>
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
    marginBottom: 28,
  },
  greeting: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: COLORS.muted,
    marginBottom: 4,
  },
  pageTitle: {
    fontSize: 26,
    fontFamily: "Inter_700Bold",
    color: COLORS.text,
    letterSpacing: -0.5,
  },

  /* Stats row */
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    alignItems: "flex-start",
    gap: 6,
  },
  statIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: COLORS.accentLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2,
  },
  statValue: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
    color: COLORS.text,
  },
  statLabel: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
    color: COLORS.muted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  /* Section title */
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Inter_600SemiBold",
    color: COLORS.muted,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 10,
  },

  /* Profile card */
  profileCard: {
    marginBottom: 28,
  },
  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: COLORS.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    color: COLORS.base,
  },
  profileText: {
    flex: 1,
    gap: 3,
  },
  profileName: {
    fontSize: 17,
    fontFamily: "Inter_700Bold",
    color: COLORS.text,
  },
  profileEmail: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    color: COLORS.muted,
  },
  badge: {
    backgroundColor: COLORS.successBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 11,
    fontFamily: "Inter_600SemiBold",
    color: COLORS.success,
    letterSpacing: 0.3,
  },

  /* Details card */
  detailsCard: {
    marginBottom: 28,
    paddingVertical: 0,
    paddingHorizontal: 20,
  },
  docRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  docLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
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

  /* Footer */
  signOutRow: {
    marginTop: 4,
    marginBottom: 16,
  },
  footerHint: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
    color: COLORS.borderStrong,
    textAlign: "center",
  },
});
