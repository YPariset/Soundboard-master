import React, { useState, useEffect} from 'react';
import { StyleSheet, View, Keyboard, SafeAreaView, FlatList, Text, TextInput, Image, TouchableOpacity, Pressable } from 'react-native';
import { colors } from '../core/theme';
import { useDebounce } from 'use-debounce';
import { playSample, formatDuration } from '../utils/expoAudio';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { addSample } from '../redux/samplesSlice';

export default function SearchFreeSound() {
  const [selectedId, setSelectedId] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [searchInputDebounce] = useDebounce(searchInput, 400);
  const [isLoading, setIsLoading] = useState(false);
  const [sounds, setSounds] = useState([]);
  const dispatch = useDispatch();
  
    const fetchApiFreeSound = async (query) => {
      const baseUrl = 'https://freesound.org/apiv2';
      const token = 'lXoqZwuB0gqVsdwcTxOYYatRlNyDuJ16FiJL5Mx7';
      setIsLoading(true);
  
      try {
        const result = await fetch(`${baseUrl}/search/text/?token=${token}&query=${query}`);
        const json = await result.json();
        const soundsId = json.results.map(sound => sound.id);
        const sounds = await Promise.all(soundsId.map(async soundId => {
          try {
            const result = await fetch(`${baseUrl}/sounds/${soundId}/?token=${token}`);
            const sound = await result.json();
            return {
              id: sound.id,
              description: sound.description,
              title: sound.name,
              duration: sound.duration,
              image: sound.images.spectral_m,
              type: 'freesound',
              link: sound.previews['preview-hq-mp3'],
            }
          } catch (error) {
            console.log('Error', error);
            return undefined;
          }
        }));
        setSounds(sounds);
      } catch (error) {
        console.log('Erreur', error);
      }
  
      setIsLoading(false);
      console.log(isLoading);
    };
  
    useEffect(() => {
      if (searchInput.trim() === '') {
        setSounds([]);
      }
  
      fetchApiFreeSound(searchInput);
    }, [searchInputDebounce]);

    useEffect(() => {
      if (searchInput.trim() === '') {
        setSounds([]);
      }
    }, [searchInput]);

  
  const renderItem = ({ item }) => {
 
    return (
        <TouchableOpacity
        onPress={() => {playSample(item)}}
        onLongPress={() => ('')}
        activeOpacity={0.8}
        style={[{ flex: 1, paddingVertical: 7,  alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', }]}
      >
        <Image
          style={{ width: 45, height: 45, borderRadius: 6, marginLeft: 5 }}
          source={{ uri: item.image }}
        />
        <View style={{ flex: 1, marginHorizontal: 14 }}>
          <Text style={[{ marginBottom: 4, color: '#fff', fontSize: 16, }]}>{item.title}</Text>
          <Text style={[{  color: '#bbb',fontSize: 12}]}>{formatDuration(item.duration)}</Text>
        </View>
        <Pressable style={[styles.smallButton]} onPress={() => dispatch(addSample(item))}>
            <Ionicons name={'add-circle'} size={20} color={colors.green} />
        </Pressable>
      </TouchableOpacity >
    );
  };

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Search</Text>
        <View style={[styles.searchInput, { marginTop: 20 }]}>
        <TextInput
          style={[styles.textInput, { flex: 1, marginHorizontal: 10 }]}
          onChangeText={setSearchInput}
          value={searchInput}
          placeholder="Search..."
          placeholderTextColor="#444"
        />
        <TouchableOpacity
          onPress={() => {
            setSearchInput('');
            Keyboard.dismiss();
          }}
          style={{ padding: 4 }}
        >
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
        <FlatList
          style={{flex: 1}}
          data={sounds}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
          />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 60
    },
    listItem:{
        margin:10,
        padding:10,
        backgroundColor: colors.light.background,
        flex:1,
        alignSelf:'center',
        flexDirection:'row',
        borderRadius:5
    },
    textInput: {
        color: '#111',
        fontSize: 16
    },
    searchInput: {
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold' 
    },
    smallButton: { 
      width: 40, 
      height: 40, 
      marginTop: 10 
    },
    });

