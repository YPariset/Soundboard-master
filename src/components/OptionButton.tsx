import { useState } from 'react';
import { Pressable, StyleSheet, View, Text, Button} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../core/theme';
import { removeSample } from '../redux/samplesSlice';
import { useDispatch } from 'react-redux';
import { addToSoundboard } from '../redux/soundboardSlice';
import Modal from "react-native-modal";

export function OptionButton({ item }) {
  const [optionOpen, setOptionOpen] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isAddModalVisible, setAddModalVisible] = useState(false);

  const dispatch = useDispatch();
  
  const renderOptions = () => {
      if (optionOpen) {
        return (
          <>
            <Pressable style={styles.smallButton}  onPress={() =>  setAddModalVisible(!isAddModalVisible)}>
              <Ionicons name={'add-circle'} size={20} color={colors.green} />
              <Modal isVisible={isAddModalVisible}  onBackdropPress={() => setAddModalVisible(false)}>
                <View style={styles.modal}>
                  <Text style={styles.text}>Add {item.title} to the soundboard ?</Text>
                  <View style={styles.buttonView}>
                    <Button title="cancel" color={colors.orange} onPress={() =>  setAddModalVisible(!isAddModalVisible)} />
                    <Button title="Yes" color={colors.green} onPress={() => {dispatch(addToSoundboard(item)), setAddModalVisible(!isAddModalVisible)}} />
                  </View>
                </View>
              </Modal>
            </Pressable>
            <Pressable style={styles.smallButton}  onPress={() =>  setEditModalVisible(!isEditModalVisible)}>
              <Ionicons name={'create'} size={20} color={colors.orange} />
              <Modal isVisible={isEditModalVisible}  onBackdropPress={() => setEditModalVisible(false)}>
                <View style={styles.modal}>
                  <Text style={styles.text}>Edit Modal</Text>
                </View>
              </Modal>
            </Pressable>
            <Pressable style={styles.smallButton} onPress={() =>  setDeleteModalVisible(!isDeleteModalVisible)}>
              <Ionicons name={'trash'} size={20} color={colors.red} />
              <Modal isVisible={isDeleteModalVisible}  onBackdropPress={() => setDeleteModalVisible(false)}>
                <View style={styles.modal}>
                  <Text style={styles.text}>Are you sure to delete {item.title} ?</Text>
                  <View style={styles.buttonView}>
                    <Button title="cancel" color={colors.orange} onPress={() =>  setDeleteModalVisible(!isDeleteModalVisible)} />
                    <Button title="Yes" color={colors.red} onPress={() => {dispatch(removeSample({id: item.id})), console.log(item.id)}} />
                  </View>
                </View>
              </Modal>
            </Pressable>
          </>
        )
      }
  };

  return (
    <View style={styles.container}>
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

const styles = StyleSheet.create({
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
  modal: {
    backgroundColor: colors.background, 
    alignItems:'center', 
    justifyContent:'center', 
    height:'auto',
    borderRadius: 10,
    padding: 20,
  },
  text: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold' 
  },
  buttonView: {
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});