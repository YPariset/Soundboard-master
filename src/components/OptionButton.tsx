import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../core/theme';
import { playSample} from '../utils/expoAudio';
import { removeSample } from '../redux/samplesSlice';
import { useDispatch } from 'react-redux';


export function OptionButton({ item }) {
  const [optionOpen, setOptionOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const dispatch = useDispatch();
  
const renderOptions = () => {
    if (optionOpen) {
      return (
        <>
          <Pressable style={[style.smallButton]}>
            <Ionicons name={'share'} size={20} color={colors.orange} />
          </Pressable>
          <Pressable style={[style.smallButton]}  onPress={() => {playSample(item), setSelectedId(item.id)}}>
            <Ionicons name={'play-circle'} size={20} color={colors.green} />
          </Pressable>
          <Pressable style={[style.smallButton]} onPress={() => {dispatch(removeSample({id: item.id})), setSelectedId(item.id), console.log(item.id)}}>
            <Ionicons name={'trash'} size={20} color={colors.red} />
          </Pressable>
        </>
       )
    }
};

  return (
    <View style={style.container}>
      <Pressable
        onPress={() => setOptionOpen(!optionOpen)}
        style={[{ marginRight: 20 }]}
      >
        <Ionicons
          name={optionOpen ? 'close' : 'ellipsis-horizontal'}
          size={30}
          color={colors.grey}
        />
      </Pressable>
      {renderOptions()}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallButton: { 
    width: 40, 
    height: 40, 
    marginTop: 10 
  },

  
  
});