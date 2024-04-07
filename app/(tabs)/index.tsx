import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import DreamForm from '@/components/DreamForm';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rêve</Text>
      
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <DreamForm />
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
