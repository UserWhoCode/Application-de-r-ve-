import React, { useState, useCallback } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

export default function DreamAnalysis() {
    const [dreams, setDreams] = useState([]);
    const [selectedDream, setSelectedDream] = useState(null);
    const [apiResponse, setApiResponse] = useState(null);

    const loadDreams = async () => {
        try {
            const storedDreams = await AsyncStorage.getItem('dreamFormDataArray');
            if (storedDreams) {
                setDreams(JSON.parse(storedDreams));
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des rêves:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadDreams();
        }, [])
    );

    const handleApiRequest = async () => {
        if (!selectedDream) {
            console.log("Aucun rêve sélectionné pour l'analyse");
            return;
        }

        try {
            const apiUrl = 'https://api.meaningcloud.com/topics-2.0';
            const language = 'fr';
            const apiKey = "Veuillez insérer votre clé API ici";

            const formdata = new FormData();
            formdata.append('key', apiKey);
            formdata.append('txt', selectedDream);
            formdata.append('lang', language);

            const requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow',
            };

            const response = await fetch(apiUrl, requestOptions);
            const responseData = await response.json();
            setApiResponse(responseData);

            console.log('Réponse de l\'API MeaningCloud :', responseData);
        } catch (error) {
            console.error('Erreur lors de la requête à l\'API MeaningCloud :', error);
        }
    };

    const renderDreamSelector = () => (
        <Picker
            selectedValue={selectedDream}
            onValueChange={(itemValue, itemIndex) => setSelectedDream(itemValue)}
            style={styles.picker}
        >
            <Picker.Item label="Sélectionnez un rêve" value={null} />
            {dreams.map((dream, index) => (
                <Picker.Item key={index} label={dream.dreamTitle || "Sans titre"} value={dream.dreamText} />
            ))}
        </Picker>
    );

    const renderTable = () => {
        if (!apiResponse || (!apiResponse.concept_list && !apiResponse.entity_list)) {
            return <Text>Aucune donnée à afficher</Text>;
        }
    
        const { concept_list: conceptsList = [], entity_list: entitiesList = [] } = apiResponse;
    
        return (
            <View>
                <Text style={styles.tableTitle}>Résultats de l'analyse :</Text>
                {conceptsList.map((concept, index) => (
                    <View key={`concept-${index}`} style={styles.tableRow}>
                        <Text style={styles.tableCell}>{concept.form}</Text>
                        <Text style={styles.tableCell}>{concept.relevance}</Text>
                    </View>
                ))}
                {entitiesList.map((entity, index) => (
                    <View key={`entity-${index}`} style={styles.tableRow}>
                        <Text style={styles.tableCell}>{entity.form}</Text>
                        <Text style={styles.tableCell}>{entity.relevance}</Text>
                    </View>
                ))}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {renderDreamSelector()}
            <Button title="Analyser le rêve sélectionné" onPress={handleApiRequest} />
            {apiResponse && renderTable()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        paddingHorizontal: 10,
    },
    picker: {
        marginBottom: 20,
    },
    tableTitle: {
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    tableCell: {
        marginRight: 10,
    },
});