import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import FileTextIcon from '../../assets/svgs/FileTextIcon';
import XIcon from '../../assets/svgs/XIcon';
import { LinearGradient } from 'expo-linear-gradient';

type Props = {
  name: string;
  status?: string;
  onRemove?: () => void;
  gradientColors?: string[];
  containerStyle?: any;
};

export default function UploadedFileItem({ name, status = '준비완료', onRemove, gradientColors = ['#818cf8', '#a78bfa'], containerStyle }: Props) {
  return (
    <View style={[styles.fileItem, containerStyle]}>
      <View style={styles.fileLeft}>
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.fileIconWrap}
        >
          <FileTextIcon size={20} color="#FFFFFF" />
        </LinearGradient>
        <View>
          <Text style={styles.fileName}>{name}</Text>
          <Text style={styles.fileSub}>{status}</Text>
        </View>
      </View>
      <Pressable style={styles.fileRemove} onPress={onRemove}>
        <XIcon size={18} color="#9CA3AF" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  fileItem: {
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  fileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  fileIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileName: {
    color: '#111827',
    fontWeight: '700',
  },
  fileSub: {
    marginTop: 2,
    color: '#9CA3AF',
    fontSize: 12,
  },
  fileRemove: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


