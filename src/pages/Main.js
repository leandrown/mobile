import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

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
   }
});

export default Main;
