
import { Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
export default function CustomButton({ label, mainStyle, route }) {
  
  const nav = useNavigation()
  
  return (
    <TouchableOpacity
      style={mainStyle}
      onPress={()=>nav.navigate(route)}
    >
      <Text>{label}</Text>
      
    </TouchableOpacity>
  );
}