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
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dialog } from "react-native-popup-dialog";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
export default function IconosChat() {
    return (
        <View style={styles.iconos}>
            <View style={styles.iconosRow}>
                <FontAwesome name="phone" size={28} color="#25D366" />
                <Text style={styles.iconText}>LLamar</Text>
            </View>

            <View style={styles.iconosRow}>

                <FontAwesome5 name="video" size={24} color="#25D366" />
                <Text style={styles.iconText}>Video</Text>
            </View>

            <View style={styles.iconosRow}>
                <Ionicons name="search-sharp" size={28} color="#25D366" />
                <Text style={styles.iconText}>Buscar</Text>
            </View>


        </View>
    )
}


const styles = StyleSheet.create({


    iconos: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 50,
        paddingTop: 20
    },
    iconosRow: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15
    },
    iconText: {
        color: '#25D366'
    }
})