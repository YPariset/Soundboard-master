import React, { useState } from 'react';
import { Pressable, PressableProps, StyleSheet, Text } from 'react-native';
import { Audio } from 'expo-av';

interface PadProps extends PressableProps {
  item: any;
}

export function Pad(props: PadProps) {
  const [selectedId, setSelectedId] = useState(null);
  const { item } = props;

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
    <Pressable onPress={() => {playSample(item), setSelectedId(item.id)}} style={[styles.container, backgroundColor, borderColor]}>
      <Text style={[styles.text, textColor]}>{item.titre}</Text>
    </Pressable>
  );

  return (
    <Item
          backgroundColor={{ backgroundColor}}
          textColor={{ color }}
          borderColor={{borderColor}}
        />
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    padding: 10,
    height: 150,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  text: {
    fontSize: 20,
  }
});
