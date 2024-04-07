import { StyleSheet, Image } from 'react-native';

import { Text, View, } from '@/components/Themed';
import DreamAnalysis from '@/components/DreamAnalysis';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Information</Text>
      <Text style={styles.title}></Text>
      <Text style={styles.title}>Sélectionnez votre rêve et regardez les points clés</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <DreamAnalysis />
      {}
    </View>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF', 
    padding: 20, 
},
  text: {
    fontSize: 15,
    fontWeight: 'normal',
    textAlign: 'center',
  },
  Image: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 24, 
    fontWeight: '600', 
    color: '#4A90E2', 
    marginVertical: 20,
    textAlign: 'center',
},
  separator: {
    marginVertical: 20,
    height: 2,
    width: '90%',
    backgroundColor: '#EB5757',
},
});
