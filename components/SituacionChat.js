import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    TextInput,
    Button,
    TouchableOpacity,
    Animated,
    Modal,
    Image,


} from 'react-native';
import { Dialog } from "react-native-popup-dialog";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
export default function SituacionChat() {
    const [selectedDate, setSelectedDate] = useState('');
    const [textInputValue, setTextInputValue] = useState('');
    const [situations, setSituations] = useState([]);
    const [showInputs, setShowInputs] = useState(false);
    const [editIndex, setEditIndex] = useState(-1);
    const [showAlertError, setShowAlertError] = useState(false);
    const retrieveSituations = async () => {
        try {
            const storedSituations = await AsyncStorage.getItem('situations');
            if (storedSituations !== null) {
                setSituations(JSON.parse(storedSituations));
            }
        } catch (error) {
            console.error('Error retrieving situations:', error);

        }
    };

    useEffect(() => {
        retrieveSituations();
    }, []);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleTextChange = (text) => {
        setTextInputValue(text);
    };

    const handleSituationSubmit = async () => {
        if (textInputValue.trim() === '') {
            setShowAlertError(true);
            setTimeout(() => {
                setShowAlertError(false);
            }, 600);
            return; // No permitir enviar situación vacía
        }

        const newSituation = { date: selectedDate, text: textInputValue };
        const updatedSituations = [...situations];

        if (editIndex !== -1) {
            updatedSituations[editIndex] = newSituation;
            setEditIndex(-1);
        } else {
            updatedSituations.push(newSituation);
        }

        try {
            await AsyncStorage.setItem('situations', JSON.stringify(updatedSituations));
            setSituations(updatedSituations);
            setSelectedDate('');
            setTextInputValue('');
            setShowInputs(false);
        } catch (error) {
            console.error('Error saving situation:', error);
            setShowAlertError(true);
            setTimeout(() => {
                setShowAlertError(false);
            }, 600);
        }
    };


    const handleEditSituation = (index) => {
        const situationToEdit = situations[index];
        setSelectedDate(situationToEdit.date);
        setTextInputValue(situationToEdit.text);
        setEditIndex(index);
        setShowEditOnly(true);
    };

    const handleDeleteSituation = async (index) => {
        const updatedSituations = [...situations];
        updatedSituations.splice(index, 1);

        try {
            await AsyncStorage.setItem('situations', JSON.stringify(updatedSituations));
            setSituations(updatedSituations);
            setShowInputs(false);
            setEditIndex(-1);
        } catch (error) {
            console.error('Error deleting situation:', error);
        }
    };
    const [showEditOnly, setShowEditOnly] = useState(false);

    return (
        <View style={styles.SituacionChat}>
            {(!showInputs && situations.length === 0) && (

                <TouchableOpacity onPress={() => setShowInputs(true)}>
                    <Text style={styles.situacionText}>Presiona para crear el Estado</Text>
                    <Text style={styles.situacionFecha}>2023</Text>
                </TouchableOpacity>
            )}

            {showInputs && (
                <View>
                    {/* Date Input */}
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Text"
                        value={textInputValue}
                        onChangeText={handleTextChange}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Select Date"
                        value={selectedDate}
                        onChangeText={handleDateChange}
                    />




                    <View style={styles.deFlex}>
                        <TouchableOpacity onPress={handleSituationSubmit} style={styles.btnListo}>
                            <Text style={styles.textBtn}>Listo</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setShowInputs(false)} style={styles.btnCancel}>
                            <Text style={styles.textBtn}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            <ScrollView>
                {situations.map((situation, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.situationContainer}
                        onPress={() => handleEditSituation(index)}
                    >
                        {showEditOnly && editIndex === index ? (
                            <View>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Text"
                                    value={textInputValue}
                                    onChangeText={handleTextChange}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Select Date"
                                    value={selectedDate}
                                    onChangeText={handleDateChange}
                                />
                                <View style={styles.deFlex}>
                                    <TouchableOpacity onPress={handleSituationSubmit} style={styles.btnListo}>
                                        <Text style={styles.textBtn}>Listo</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setShowEditOnly(false)} style={styles.btnCancel}>
                                        <Text style={styles.textBtn}>Cancelar</Text>
                                    </TouchableOpacity>
                                </View>
                                {editIndex === index && (
                                    <View>
                                        <TouchableOpacity onPress={() => handleDeleteSituation(index)} style={styles.delete}>
                                            <MaterialIcons name="delete" size={24} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                        ) : (
                            <View>
                                <Text style={styles.situacionText}>{situation.text}</Text>
                                <Text style={styles.situacionFecha}>{situation.date}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                ))}
            </ScrollView>


            <Dialog
                visible={showAlertError}
                onTouchOutside={() => setShowAlertError(false)}
            >
                <View style={styles.agregado}>
                    <Text>Todos los campos son requeridos! </Text>
                </View>
            </Dialog>
        </View>
    );
}
const styles = StyleSheet.create({
    SituacionChat: {
        backgroundColor: '#FFF',
        marginTop: 10,
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
    },
    agregado: {
        padding: 10

    },
    situacionText: {
        fontSize: 16,
        color: 'rgba(0, 0, 0, 0.8)',
    },
    situacionFecha: {
        fontSize: 14,
        color: 'rgba(0, 0, 0, 0.6)',
    },
    deFlex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    btnCancel: {
        backgroundColor: '#CB6CE6',
        padding: 8,
        borderRadius: 20,
        width: 140,
        textAlign: 'center',
        alignItems: 'center',

    },
    btnListo: {
        backgroundColor: '#128C7E',
        padding: 8,
        borderRadius: 20,
        width: 140,
        textAlign: 'center',
        alignItems: 'center'
    },
    textBtn: {
        color: '#ffff'
    },
    input: {

        borderRadius: 16,
        paddingHorizontal: 10,
        marginBottom: 10,
        width: '100%',
        backgroundColor: 'rgba(18, 140, 126, 0.2)',
        borderRadius: 20,
        padding: 10
    },
    delete: {
        alignItems: 'center',
        marginTop: -30,
        justifyContent: 'center',

        position: 'absolute',
        left: '40%',
        right: '40%'
    }
});
