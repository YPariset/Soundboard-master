import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, FlatList, Pressable, PressableProps, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { SampleSelector } from '../redux/samplesSlice';
import { Audio } from 'expo-av';


export function Playground() {
  const [selectedId, setSelectedId] = useState(null);

  const samples = useSelector(SampleSelector).samples;

  const playSample = async (item) => {
    try {
        var { } = await Audio.Sound.createAsync(
            item.lien,
            { shouldPlay: true }
        );
      } catch (error){
          console.error(error);
      }
    };

  const renderItem = ({ item }) => {
    let backgroundColor: string;
    let color: string;
    let borderColor: string;
  
  
    switch (true){
      case item.id <= 4 && item.id === selectedId : backgroundColor = "#7B90A9", color="white", borderColor="#73A8E6"; break;
      case item.id <= 8 && item.id === selectedId : backgroundColor = "#B37A94", color="white", borderColor="#E673A8"; break;
      case item.id <= 12 && item.id === selectedId : backgroundColor = "#A9947B", color="white", borderColor="#E6B173"; break;
      case item.id < 16 && item.id === selectedId: backgroundColor = "#7BA994", color="white", borderColor="#73E6B1"; break;
      default: backgroundColor = '#2D3A44', color="white", borderColor="black";
  }
  
  
    const Item = ({ backgroundColor, textColor, borderColor }) => (
      <Pressable onPress={() => {playSample(item), setSelectedId(item.id)}} style={[style.pad, backgroundColor, borderColor]}>
        <Text style={[style.text, textColor]}>{item.titre}</Text>
      </Pressable>
    );

    return (
          <Item
          backgroundColor={{ backgroundColor}}
          textColor={{ color }}
          borderColor={{borderColor}}
          />

    );
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={style.padContainer}>
        <FlatList
          style={style.flatList}
          data={samples}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
          numColumns={3}
          />
        </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop:20,
    backgroundColor: '#2D3A44',
    width: 'auto',
  },
  padContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: 'auto',
  },
  flatList:{
    width: 'auto',
    margin: 10,
  },
  pad: {
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    padding: 10,
    height: 115,
    width: 110,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  text: {
    fontSize: 15,
  }
});

