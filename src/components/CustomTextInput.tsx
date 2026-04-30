import { Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

interface CustomTextInputProps {
  label?: string; // Made optional to match the 'Sign In' screen design
  placeholder: string;
  value: string;
  textStyle?: any;
  containerStyle?: any;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  placeholderTextColor?: string; // Added this to fix the TS error in image_f20bdf.png
}

const CustomTextInput = ({
  label,
  placeholder,
  value,
  textStyle,
  containerStyle,
  onChangeText,
  secureTextEntry = false,
  placeholderTextColor, // Destructure the new prop
}: CustomTextInputProps) => {
  return (
    <View style={containerStyle}>
      {/* Only render label if it exists */}
      {label && <Text style={{ fontWeight: 'bold' }}>{label}</Text>}
      
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor} // Apply it here
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        style={[
          {
            width: '100%',
            borderBottomWidth: 1,
          },
          textStyle,
        ]}
      />
    </View>
  );
};

export default CustomTextInput;