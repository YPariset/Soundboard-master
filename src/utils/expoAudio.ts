import { Audio } from 'expo-av';

export const playSample = async (item) => {
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

export const formatDuration = (duration) => {
  try {
    return new Date(duration * 1000).toISOString().slice(14, 19);
  } catch(e) {
    return `00:00`;
  }
};