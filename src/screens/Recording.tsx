import { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Button, Pressable, SafeAreaView, Text} from 'react-native';
import { Audio } from 'expo-av';
import { addSample, logout, SampleSelector } from '../redux/samplesSlice';
import { useDispatch, useSelector } from "react-redux";
import * as FileSystem from 'expo-file-system';
import { colors } from '../core/theme';

export default function Recording() {

  const AudioRecorder = useRef(new Audio.Recording());
  const AudioPlayer = useRef(new Audio.Sound());

  const [uri, setUri] = useState("");

  const [AudioPermission, SetAudioPermission] = useState(false);
  const [IsRecording, SetIsRecording] = useState(false);
  const [IsPLaying, SetIsPLaying] = useState(false);

  const recordsFolder = FileSystem.documentDirectory + 'recording/';
  const dispatch = useDispatch();
  const samples = useSelector(SampleSelector);

   useEffect(() => {
      GetPermission();
    }, []);

  const GetPermission = async () => {
   const getPermission = await Audio.requestPermissionsAsync();
   SetAudioPermission(getPermission.granted);
 };

 const StartRecording = async () => {
   await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    }); 
   try {
     if (AudioPermission === true) {
       try {
         await AudioRecorder.current.prepareToRecordAsync(
           Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
         );
         await AudioRecorder.current.startAsync();
         SetIsRecording(true);
       } catch (error) {
         console.log(error);
       }
     } else {
       GetPermission();
     }
   } catch (error) {}
 };

  const StopRecording = async () => {
   try {
     await AudioRecorder.current.stopAndUnloadAsync();

     const result = AudioRecorder.current.getURI();
     setUri(AudioRecorder.current.getURI());
     if (result) setUri(result);

     AudioRecorder.current = new Audio.Recording();
     SetIsRecording(false);
   } catch (error) {}
 };


  const PlayRecordedAudio = async () => {
   try {
     await AudioPlayer.current.loadAsync({ uri: uri }, {}, true);

     const playerStatus = await AudioPlayer.current.getStatusAsync();

     if (playerStatus.isLoaded) {
       if (playerStatus.isPlaying === false) {
         AudioPlayer.current.playAsync();
         SetIsPLaying(true);
       }
     }
   } catch (error) {}
 };

 const StopPlaying = async () => {
   try {
     const playerStatus = await AudioPlayer.current.getStatusAsync();
     if (playerStatus.isLoaded === true)
       await AudioPlayer.current.unloadAsync();
     SetIsPLaying(false);
   } catch (error) {}
 };

  const saveRecording = async() => {
    const dataFolder = await FileSystem.getInfoAsync(recordsFolder);
    let known = dataFolder.exists;
    if (!known) {
        console.log("Folder not found");
        try {
            await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + "recording");
            console.log("New folder created");
        } catch (error) {
            console.log(error);
        }
    }
    var last_item = samples[samples.length - 1];
    var new_id_item = last_item.id + 1;
    FileSystem.moveAsync({
     from: uri,
     to: recordsFolder + 'recording-' + new_id_item + '.wav',
   });
   dispatch(addSample({
     id: new_id_item,
     title: 'recording-' + new_id_item  + '.wav',
     link: recordsFolder + 'recording-' + new_id_item + '.wav',
     type: "recording",
     image: "../../assets/image-default.jpeg"
   }));
 }
   
   return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Recording</Text>
      <View style={styles.viewContainer}>
          {IsRecording ? (
              <Pressable style={[styles.recordButton]} onPress={StopRecording}>
                <View style={[styles.recordIcon, styles.stopIcon]} />
              </Pressable>
            ) : (
              <Pressable
                style={[styles.recordButton]}
                onPress={async () => (await StartRecording())}
              >
                <View style={[styles.recordIcon]} />
              </Pressable>
            )}
             <Button
          title={IsRecording ? "Stop Recording" : "Start Recording"}
          color={IsRecording ? "red" : "green"}
          onPress={IsRecording ? StopRecording : StartRecording}
        />
        <Button
          title={IsPLaying ? "Stop Sound" : "Play Sound"}
          color={IsPLaying ? "red" : "orange"}
          onPress={IsPLaying ? StopPlaying : PlayRecordedAudio}
        />
        <Button title='Enregistrer' color='blue' onPress={saveRecording} />
        <Button title='Delete all' onPress={() => dispatch(logout())} />
    </View>
   </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors.background,
      padding: 10,

   },
   viewContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
   },
   butonsContainer: {
    height: '80%',
  },
  recordButton: {
    borderWidth: 2,
    borderColor: colors.grey,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 102,
    height: 102,
  },
  recordIcon: {
    width: 90,
    height: 90,
    backgroundColor: 'red',
    borderRadius: 50,
  },
  stopIcon: {
    borderRadius: 4,
    width: 60,
    height: 60,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold' 
}
});