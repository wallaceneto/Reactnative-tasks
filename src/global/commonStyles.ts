import {ColorValue} from 'react-native';

type Colors = {
  today: ColorValue;
  secondary: ColorValue;
  mainText: ColorValue;
  subText: ColorValue;
};

type Theme = {
  fontFamily: string;
  colors: Colors;
};

const theme: Theme = {
  fontFamily: 'Lato',
  colors: {
    today: '#B13B44',
    secondary: '#FFF',
    mainText: '#222',
    subText: '#555',
  },
};

export default theme;
