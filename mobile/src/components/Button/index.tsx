import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { theme } from '../../theme';
import { styles } from './styles';

interface Props extends TouchableOpacityProps {
  isLoading: boolean;
  children: string;
}

export function Button({ isLoading, children, ...props }: Props) {
  return (
    <TouchableOpacity style={styles.container} {...props}>
      { isLoading ? 
        <ActivityIndicator color={theme.colors.text_on_brand_color}/> 
        : 
        <Text style={styles.title}>{children}</Text>
      }
    </TouchableOpacity>
  );
}
