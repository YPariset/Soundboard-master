import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Pad } from '../components/Pads';
import { SampleSelector } from '../redux/samplesSlice';

export function Playground() {
 
  const samples = useSelector(SampleSelector).samples;

  return (
    <View style={[style.container]}>
      <View style={style.padContainer}>
        {samples.map((sample) => (
          console.log(sample),
          <Pad
            item={sample}
            key={sample.id}
          />
        ))}
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: '#2D3A44',
    paddingTop: 30,
    height: '100%',
  },
  padContainer: {
    marginHorizontal: 10,
    marginVertical: 30,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

