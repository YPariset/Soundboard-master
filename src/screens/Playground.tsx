import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, FlatList, Pressable, Text, } from 'react-native';
import { useSelector } from 'react-redux';
import { playSample } from '../utils/expoAudio';
import { colors } from '../core/theme';
import { SoundboardSelector } from '../redux/soundboardSlice';

export default function Playground() {
  const [selectedId, setSelectedId] = useState(null);
  const samples = useSelector(SoundboardSelector);

  const renderItem = ({ item }) => {
    let shadowColor: string;
    switch (true){
      case item.id <= 4 && item.id === selectedId : shadowColor=colors.blue; break;
      case item.id <= 8 && item.id === selectedId : shadowColor=colors.red ; break;
      case item.id <= 12 && item.id === selectedId: shadowColor=colors.yellow ;break;
      case item.id < 16 && item.id === selectedId: shadowColor=colors.pink ;break;
      case item.type != "default" && item.id === selectedId: shadowColor=colors.purlple; break;
      default: shadowColor=colors.green;
  }
  
    const Item = ({shadowColor}) => (
      <Pressable onPress={() => {playSample(item), setSelectedId(item.id)}} style={[styles.pad, shadowColor]}>
        <Text style={[styles.text]}>{item.type}</Text>
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
      <View style={styles.viewTitle}>
        <Text style={styles.title}>Playground</Text>
      </View>
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
    paddingTop: 10,
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
    color:'white',
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold' 
},
  viewTitle: {
    padding: 5,
    marginBottom: 5
  }
});

