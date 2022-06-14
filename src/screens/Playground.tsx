import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, FlatList, Pressable, Text, } from 'react-native';
import { useSelector } from 'react-redux';
import { SampleSelector } from '../redux/samplesSlice';
import { Audio } from 'expo-av';
import { colors } from '../core/theme';


export default function Playground() {
  const [selectedId, setSelectedId] = useState(null);
  const samples = useSelector(SampleSelector);

  const playSample = async (item) => {
    try {
      if (item.type == "default"){
         await Audio.Sound.createAsync(
           item.link,
           { shouldPlay: true }
         );
       console.log(item);
      }
      else {
         await Audio.Sound.createAsync(
           { uri: item.link},
           { shouldPlay: true }
         );
       console.log(item);
      }
   } catch (error){
       console.error(error);
   }
};

  const renderItem = ({ item }) => {
    let shadowColor: string;
    switch (true){
      case item.id <= 4 && item.id === selectedId : shadowColor=colors.blue; break;
      case item.id <= 8 && item.id === selectedId : shadowColor=colors.red ; break;
      case item.id <= 12 && item.id === selectedId: shadowColor=colors.yellow ;break;
      case item.id < 16 && item.id === selectedId: shadowColor=colors.green ;break;
      case item.type != "default" && item.id === selectedId: shadowColor=colors.green; break;
      default: shadowColor=colors.green;
  }
  
  
    const Item = ({shadowColor }) => (
      <Pressable onPress={() => {playSample(item), setSelectedId(item.id)}} style={[styles.pad, shadowColor]}>
        <Text style={[styles.text]}>{item.id}</Text>
      </Pressable>
    );

    return (
          <Item
          shadowColor={{shadowColor}}
          />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <FlatList
          style={styles.flatList}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  viewContainer: {
    height: 700
  },
  flatList:{
    width: 'auto',
    paddingTop: 20,
  },
  pad: {
    backgroundColor: colors.light.background,
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    padding: 10,
    height: 110,
    width: 110,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  text: {
    fontSize: 15,
    color:'white'
  },
});

