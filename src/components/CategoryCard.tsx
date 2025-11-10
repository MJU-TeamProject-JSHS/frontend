import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type Props = {
  title: string;
  colors: [string, string];
  Icon: React.ComponentType<{ size?: number; color?: string; opacity?: number }>;
};

export default function CategoryCard({ title, colors, Icon }: Props) {
  return (
    <LinearGradient colors={colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.card}>
      <View style={styles.iconGlass}>
        <Icon size={36} color="#FFFFFF" opacity={0.95} />
      </View>
      <Text style={styles.title}>{title}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    height: 190,
    borderRadius: 20,
    padding: 16,
    justifyContent: 'space-between',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  iconGlass: {
    alignSelf: 'center',
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    alignSelf: 'center',
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 12,
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
  },
});


