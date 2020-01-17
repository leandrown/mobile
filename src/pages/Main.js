import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

function Main({ navigation }) {
   const [currentRegion, setCurrentRegion] = useState(null);

   useEffect(() => {
      async function loadInitialPosition() {
         const { granted } = await requestPermissionsAsync();
         if (granted) {
            const { coords } = await getCurrentPositionAsync({
               enableHighAccuracy: true
            });

            const { latitude, longitude } = coords;

            setCurrentRegion({
               latitude,
               longitude,
               latitudeDelta: 0.04,
               longitudeDelta: 0.04
            });
         }
      }

      loadInitialPosition();
   }, []);

   if (!currentRegion) {
      return null;
   }

    return (
      <>
      <MapView initialRegion={currentRegion} style={styles.map}>
         <Marker coordinate={{ latitude: -23.4349335, longitude: -46.5174823 }}>
            <Image source={{ uri: 'https://avatars1.githubusercontent.com/u/1755147?s=460&v=4' }} style={styles.avatar} />
            <Callout onPress={() => {
               navigation.navigate('Profile', { github_username: 'leandrown' });
            }}>
               <View style={styles.callout}>
                  <Text style={styles.devName}>Leandro Vieira</Text>
                  <Text style={styles.devBio}>Passion for games, TypeScript and C#</Text>
                  <Text style={styles.devTechs}>NodeJS, ReactJS e React Native</Text>
               </View>
            </Callout>
         </Marker>
      </MapView>
      <View style={styles.searchForm}>
         <TextInput
            style={styles.searchInput}
            placeholder="Buscar devs por tecnologia"
            placeholderTextColor="#999"
            autoCapitalize="words"
            autoCorrect={false}
         />

         <TouchableOpacity onPress={() => {}} style={styles.loadButton}>
            <MaterialIcons name="my-location" size={20} color="#fff" />
         </TouchableOpacity>
      </View>
      </>
    );
}

const styles = StyleSheet.create({
   map: {
      flex: 1
   },
   avatar: {
      width: 54,
      height: 54,
      borderRadius: 4,
      borderWidth: 4,
      borderColor: '#fff'
   },
   callout: {
      width: 260,
   },
   devName: {
      fontWeight: 'bold',
      fontSize: 16
   },
   devBio: {
      color: '#666',
      marginTop: 5
   },
   devTechs: {
      marginTop: 5
   },
   searchForm: {
      position: 'absolute',
      bottom: 20,
      left: 20,
      right: 20,
      zIndex: 5,
      flexDirection: 'row'
   },
   searchInput: {
      flex: 1,
      height: 50,
      backgroundColor: '#fff',
      color: '#333',
      borderRadius: 10,
      paddingHorizontal: 20,
      fontSize: 16,
      // funciona no iOS
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: {
         width: 4,
         height: 4
      },
      // funciona no Android
      elevation: 2

   },
   loadButton: {
      width: 50,
      height: 50,
      backgroundColor: '#8e4dff',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 15
   }
});

export default Main;
