import { Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

interface CustomTextInputProps {
  label: string;
  placeholder: string;
  value: string;
  textStyle?: any;
  containerStyle?: any;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
}

const CustomTextInput = ({
  label,
  placeholder,
  value,
  textStyle,
  containerStyle,
  onChangeText,
  secureTextEntry = false,
}: CustomTextInputProps) => {
  return (
    <View style={containerStyle}>
      <Text style={{ fontWeight: 'bold' }}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        style={[
          textStyle,
          {
            width: '100%',
            borderBottomWidth: 1,
          },
        ]}
      />
    </View>
  );
};

export default CustomTextInput;
