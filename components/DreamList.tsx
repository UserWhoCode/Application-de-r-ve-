import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DreamList() {
    const [dreams, setDreams] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await AsyncStorage.getItem('dreamFormDataArray');
                const dreamFormDataArray = data ? JSON.parse(data) : [];
                setDreams(dreamFormDataArray);
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const updateComponent = async () => {
            try {
                const data = await AsyncStorage.getItem('dreamFormDataArray');
                const dreamFormDataArray = data ? JSON.parse(data) : [];
                setDreams(dreamFormDataArray);
            } catch (error) {
                console.error('Erreur lors de la mise à jour des données:', error);
            }
        };
        updateComponent();
    }, [dreams]);

    async function handleDeleteDream(index: number) {
        const data = await AsyncStorage.getItem("dreamFormDataArray");
        const dreamFormDataArray = data ? JSON.parse(data) : [];
        dreamFormDataArray.splice(index, 1);
        await AsyncStorage.setItem("dreamFormDataArray", JSON.stringify(dreamFormDataArray));
        console.log(dreamFormDataArray);
    }

    const filteredDreams = dreams.filter(dream =>
        dream.dreamTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dream.dreamText.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View>
            <TextInput
                placeholder="Recherche..."
                style={styles.searchBar}
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <Text style={styles.title}>Liste des Rêves :</Text>
            <ScrollView>
                {filteredDreams.map((dream, index) => (
                    <View key={index} style={styles.dreamEntry}>
                        <Text style={styles.dreamTitle}>{dream.dreamTitle ? `${dream.dreamTitle}: ` : 'Sans titre'} </Text>
                        <Text style={styles.dreamText}>{dream.dreamText}</Text>
                        <Text style={styles.dreamDate}>Date: {dream.dreamDate}</Text>
                            <Text style={styles.dreamDetails}>{dream.isLucidDream ? 'Lucide' : 'Non Lucide'}</Text>
                            <Text style={styles.dreamEmotions}>
                                Émotions: {dream.dreamHappiness ? 'Bonheur ' : ''}
                                        {dream.dreamSadness ? 'Tristesse ' : ''}
                                        {dream.dreamFear ? 'Peur ' : ''}
                                        {dream.dreamAnger ? 'Colère ' : ''}
                                        {dream.isNightmare ? ' - Cauchemar' : ''}
                            </Text>
                            <Text style={styles.dreamPeople}>
                                Personnes: {dream.dreamFamily ? 'Famille ' : ''}
                                        {dream.dreamFriend ? 'Ami ' : ''}
                                        {dream.dreamColleague ? 'Collègue ' : ''}
                                        {dream.dreamCelebrity ? 'Célébrité ' : ''}
                                        {dream.dreamAnimal ? 'Animal ' : ''}
                                        {dream.dreamOther ? 'Autre ' : ''}
                            </Text>
                        <Button title="Supprimer" onPress={() => handleDeleteDream(index)}></Button>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    searchBar: {
        fontSize: 18,
        marginBottom: 20,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginHorizontal: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
        marginTop: 20,
    },
    dreamEntry: {
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    dreamTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#005a9c',
    },
    dreamText: {
        fontSize: 16,
        marginBottom: 10,
        color: '#4a4a4a',
    },
    dreamDate: {
        fontSize: 16,
        marginBottom: 10,
    },
    dreamDetails: {
        fontSize: 14,
        fontStyle: 'italic',
        marginBottom: 10,
        color: '#777',
    },
    dreamEmotions: {
        fontSize: 14,
        marginBottom: 5,
        color: '#d35400',
    },
    dreamPeople: {
        fontSize: 14,
        color: '#27ae60',
    },
});
