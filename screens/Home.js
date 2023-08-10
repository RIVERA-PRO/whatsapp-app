import React, { useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import NewChat from '../components/NewChat';
import Header from '../components/HeaderBlanco';
import { FontAwesome } from '@expo/vector-icons';
import AllChats from '../components/AllChats';
import LlamadasAll from '../components/LlamadasAll';
import ChatCantidad from '../components/ChatCantidad';
import { MaterialIcons } from '@expo/vector-icons';
import EstadosAll from '../components/EstadosAll';
import Grupo from '../components/Grupo';
const windowWidth = Dimensions.get('window').width;

export default function Home() {
    const navigation = useNavigation();
    const [selectedComponent, setSelectedComponent] = useState('AllChats');
    const scrollViewRef = useRef();
    const handleScrollEnd = (event) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const newSelectedComponent =
            offsetX === 0 ? 'AllChats' : offsetX === windowWidth ? 'EstadosAll' : offsetX === windowWidth * 2 ? 'LlamadasAll' : 'Grupo';
        setSelectedComponent(newSelectedComponent);
    };


    const scrollToComponent = (component) => {
        let position = 0;
        if (component === 'AllChats') {
            position = 0;
        } else if (component === 'EstadosAll') {
            position = windowWidth;
        } else if (component === 'LlamadasAll') {
            position = windowWidth * 2;
        } else if (component === 'Grupo') {
            position = windowWidth * 3;
        }
        scrollViewRef.current.scrollTo({
            x: position,
            animated: true,
        });
    };




    return (
        <View style={styles.contenedor}>
            <View style={styles.header}>
                <LinearGradient colors={['#128C7E', '#128C7E']} style={styles.bg}>
                    <Header />
                    <View style={styles.buttonContainer}>


                        <TouchableOpacity
                            style={[
                                styles.button,
                                selectedComponent === 'Grupo' ? styles.activeButton : null,
                            ]}
                            onPress={() => scrollToComponent('Grupo')}
                        >
                            <View style={styles.deflex}>
                                <MaterialIcons name="groups" size={26} color='rgba(255, 255, 255, 0.6)' style={[
                                    styles.buttonTextIcon,

                                ]} />

                            </View>
                            {selectedComponent === 'Grupo' && <View style={styles.selectedIndicator} />}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.button,
                                selectedComponent === 'AllChats' ? styles.activeButton : null,
                            ]}
                            onPress={() => scrollToComponent('AllChats')}
                        >
                            <View style={styles.deflex}>
                                <Text
                                    style={[
                                        styles.buttonText,
                                        selectedComponent === 'AllChats' ? styles.activeButtonText : null,
                                    ]}
                                >
                                    Ch...
                                </Text>

                                <ChatCantidad />

                            </View>
                            {selectedComponent === 'AllChats' && <View style={styles.selectedIndicator} />}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.button,
                                selectedComponent === 'EstadosAll' ? styles.activeButton : null,
                            ]}
                            onPress={() => scrollToComponent('EstadosAll')}
                        >

                            <View style={styles.deflex}>
                                <Text
                                    style={[
                                        styles.buttonText,
                                        selectedComponent === 'EstadosAll' ? styles.activeButtonText : null,
                                    ]}
                                >
                                    Estados
                                </Text>

                            </View>

                            {selectedComponent === 'EstadosAll' && <View style={styles.selectedIndicator} />}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.button,
                                selectedComponent === 'LlamadasAll' ? styles.activeButton : null,
                            ]}
                            onPress={() => scrollToComponent('LlamadasAll')}
                        >
                            <View style={styles.deflex}>
                                <Text
                                    style={[
                                        styles.buttonText,
                                        selectedComponent === 'LlamadasAll' ? styles.activeButtonText : null,
                                    ]}
                                >
                                    Llamadas
                                </Text>
                            </View>
                            {selectedComponent === 'LlamadasAll' && <View style={styles.selectedIndicator} />}
                        </TouchableOpacity>
                    </View>

                </LinearGradient>
            </View>


            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={handleScrollEnd}
            >
                <ScrollView style={styles.scrollView}>
                    <AllChats />
                    <View style={styles.espacio}>

                    </View>
                </ScrollView>


                <ScrollView style={styles.scrollView}>
                    <EstadosAll />
                    <View style={styles.espacio}>

                    </View>
                </ScrollView>
                <ScrollView style={styles.scrollView}>
                    <LlamadasAll />
                    <View style={styles.espacio}>

                    </View>
                </ScrollView>
                <ScrollView style={styles.scrollView}>
                    <Grupo />
                    <View style={styles.espacio}>

                    </View>
                </ScrollView>
            </ScrollView>


        </View>
    );
}

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: '#fff',

    },
    header: {
        width: '100%',
        marginBottom: 20,
        position: 'absolute',
        zIndex: 2,
        top: 0,
    },
    bg: {
        height: 160,
        paddingTop: 60,
    },
    scrollView: {
        width: windowWidth,
        paddingTop: 135
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 6


    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 15,
        paddingHorizontal: 9,
    },
    buttonTextIcon: {
        paddingHorizontal: 9,


    },


    activeButtonText: {
        color: 'white',
    },
    selectedIndicator: {
        marginTop: 1,
        bottom: -10,
        width: '100%',
        height: 3,
        backgroundColor: '#fff',

    },
    deflex: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6
    },
    espacio: {
        height: 100
    },
});
