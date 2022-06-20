import React, { useState} from 'react';
import { StyleSheet, View, Keyboard, SafeAreaView, FlatList, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { SampleSelector } from '../redux/samplesSlice';
import { colors } from '../core/theme';
import { OptionButton } from '../components/OptionButton';
import { playSample, formatDuration } from '../utils/expoAudio';


export default function Library() {
  const [selectedId, setSelectedId] = useState(null);
  const samples = useSelector(SampleSelector);

  const [searchTextInput, setSearchTextInput] = useState('');

  function filterSound(list: any[]) {
    if(searchTextInput.length === 0) {
      return list
    }
    return list.filter((item) => {
      let itemLowerCase = item.title.toLowerCase();
      let searchItemToLowerCase = searchTextInput.toLowerCase();
      return itemLowerCase.indexOf(searchItemToLowerCase) > -1;
    });
  }

  const renderItem = ({ item }) => {
 
    return (
        <TouchableOpacity
        onPress={() => playSample(item)}
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
          <Text style={[{  color: '#bbb',fontSize: 12}]}>{formatDuration(item.duration)} • {item.type}</Text>
        </View>
        <OptionButton item={item}></OptionButton>
      </TouchableOpacity >
    );
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.viewTitle}>
          <Text style={styles.title}>Library</Text>
        </View>
        <View style={[styles.searchInput, { marginTop: 20 }]}>
        <TextInput
          style={[styles.textInput, { flex: 1, marginHorizontal: 10 }]}
          onChangeText={setSearchTextInput}
          value={searchTextInput}
          placeholder="Search..."
          placeholderTextColor="#444"
        />
        <TouchableOpacity
          onPress={() => {
            setSearchTextInput('');
            Keyboard.dismiss();
          }}
          style={{ padding: 4 }}
        >
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
        <FlatList
          style={{flex: 1}}
          data={filterSound(samples)}
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
        alignSelf:"center",
        flexDirection:"row",
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
    viewTitle: {
      padding: 5,
      alignItems: 'center',
      justifyContent: 'center'
    }
    });

