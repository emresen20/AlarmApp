import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const Chossenvoiceimage = ({ Choosenvoice }) => {
  const [currentVoice, setCurrentVoice] = useState(Choosenvoice);
  const [imageSource, setImageSource] = useState(null);

  // Choosenvoice değerine göre görüntü kaynağını belirle
  useEffect(() => {
    if (currentVoice === 'sound') {
      setImageSource(require('../assets/images/ramiz.png'));
    } else if (currentVoice === 'sound1') {
      setImageSource(require('../assets/images/arthur4.png'));
    } else if (currentVoice === 'sound2') {
      setImageSource(require('../assets/images/ronaldo.png'));
    } else {
      // Varsayılan durum için bir görüntü belirleme
      setImageSource(require('../assets/images/ramiz.png'));
    }
  }, [currentVoice]);

  return (
    <Image
      style={{
        width: 100,
        height: 100,
        borderRadius:15
      }}
      source={imageSource}
    />
  );
};

export default Chossenvoiceimage;
