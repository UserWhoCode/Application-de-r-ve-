import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { TextInput, Text, Button, Checkbox } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default function DreamForm() {
    const [dreamTitle, setDreamTitle] = useState('');
    const [dreamText, setDreamText] = useState('');
    const [isLucidDream, setIsLucidDream] = useState(false);
    const [isNightmare, setIsNightmare] = useState(false);
    const [dreamFamily, setDreamFamily] = useState(false);
    const [dreamFriend, setDreamFriend] = useState(false);
    const [dreamColleague, setDreamColleague] = useState(false);
    const [dreamCelebrity, setDreamCelebrity] = useState(false);
    const [dreamAnimal, setDreamAnimal] = useState(false);
    const [dreamOther, setDreamOther] = useState(false);
    const [dreamHappiness, setDreamHappiness] = useState(false);
    const [dreamSadness, setDreamSadness] = useState(false);
    const [dreamFear, setDreamFear] = useState(false);
    const [dreamAnger, setDreamAnger] = useState(false);
    const [dreamSurprise, setDreamSurprise] = useState(false);
    const [dreamDate, setDreamDate] = useState('');
    

    const handleDreamSubmission = async () => {
        try {
            const existingData = await AsyncStorage.getItem('dreamFormDataArray');
            const formDataArray = existingData ? JSON.parse(existingData) : [];
            formDataArray.push({ dreamTitle, dreamDate, dreamText, isLucidDream, isNightmare, dreamFamily, dreamFriend, dreamColleague, dreamCelebrity, dreamAnimal, dreamOther, dreamHappiness, dreamSadness, dreamFear, dreamAnger, dreamSurprise});
            await AsyncStorage.setItem('dreamFormDataArray', JSON.stringify(formDataArray));
        } catch (error) {
            console.error('Erreur lors de la sauvegarde des données:', error);
        }

        setDreamTitle('');
        setDreamText('');
        setDreamDate('');
        setIsLucidDream(false);
        setIsNightmare(false);
        setDreamFamily(false);
        setDreamFriend(false);
        setDreamColleague(false);
        setDreamCelebrity(false);
        setDreamAnimal(false);
        setDreamOther(false);
        setDreamHappiness(false);
        setDreamSadness(false);
        setDreamFear(false);
        setDreamAnger(false);
        setDreamSurprise(false);
        
    };

    return (
        <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
            <TextInput
                label="Titre du rêve"
                value={dreamTitle}
                onChangeText={setDreamTitle}
                mode="outlined"
                style={[styles.input, { width: width * 0.8, alignSelf: 'center' }]}
            />

            <TextInput
                label="Date du rêve (JJ/MM/AAAA)"
                value={dreamDate}
                onChangeText={setDreamDate}
                mode="outlined"
                style={[styles.input, { width: width * 0.8, alignSelf: 'center' }]}
            />

            <TextInput
                label="Décrivez votre rêve"
                value={dreamText}
                onChangeText={setDreamText}
                mode="outlined"
                multiline
                numberOfLines={6}
                style={[styles.input, { width: width * 0.8, alignSelf: 'center' }]}
            />

            <Text style={styles.sectionTitle}>Émotions</Text>
            <View style={styles.checkboxContainer}>
                <Checkbox.Item label="Bonheur" status={dreamHappiness ? 'checked' : 'unchecked'} onPress={() => setDreamHappiness(!dreamHappiness)} />
                <Checkbox.Item label="Tristesse" status={dreamSadness ? 'checked' : 'unchecked'} onPress={() => setDreamSadness(!dreamSadness)} />
                <Checkbox.Item label="Peur" status={dreamFear ? 'checked' : 'unchecked'} onPress={() => setDreamFear(!dreamFear)} />
                <Checkbox.Item label="Colère" status={dreamAnger ? 'checked' : 'unchecked'} onPress={() => setDreamAnger(!dreamAnger)} />
                <Checkbox.Item label="Cauchemar" status={isNightmare ? 'checked' : 'unchecked'} onPress={() => setIsNightmare(!isNightmare)} />
                <Checkbox.Item label="reve lucide" status={isLucidDream ? 'checked' : 'unchecked'} onPress={() => setIsLucidDream(!isLucidDream)} />
            </View>

            <Text style={styles.sectionTitle}>Personnes</Text>
            <View style={styles.checkboxContainer}>
                <Checkbox.Item label="Famille" status={dreamFamily ? 'checked' : 'unchecked'} onPress={() => setDreamFamily(!dreamFamily)} />
                <Checkbox.Item label="Ami" status={dreamFriend ? 'checked' : 'unchecked'} onPress={() => setDreamFriend(!dreamFriend)} />
                <Checkbox.Item label="Collègue" status={dreamColleague ? 'checked' : 'unchecked'} onPress={() => setDreamColleague(!dreamColleague)} />
                <Checkbox.Item label="Célébrité" status={dreamCelebrity ? 'checked' : 'unchecked'} onPress={() => setDreamCelebrity(!dreamCelebrity)} />
                <Checkbox.Item label="Animal" status={dreamAnimal ? 'checked' : 'unchecked'} onPress={() => setDreamAnimal(!dreamAnimal)} />
                <Checkbox.Item label="Autre" status={dreamOther ? 'checked' : 'unchecked'} onPress={() => setDreamOther(!dreamOther)} />
            </View>

            <Button mode="contained" onPress={handleDreamSubmission} style={styles.button}>
                Soumettre
            </Button>
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    input: {
        marginBottom: 16,
    },
    checkboxContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginBottom: 16,
    },
    button: {
        marginTop: 8,
    },
    sectionTitle: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
    },
});