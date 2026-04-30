import React from 'react';
import { Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';

// Define an interface for the props to resolve the "implicitly has any type" errors
interface CustomButtonProps {
  label: string;
  onPress: () => void;
  containerStyle?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
}

const CustomButton = ({ 
  containerStyle, 
  textStyle, 
  label, 
  onPress 
}: CustomButtonProps) => {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
        },
        containerStyle 
      ]}
      activeOpacity={0.7}
    >
      <Text style={textStyle}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;