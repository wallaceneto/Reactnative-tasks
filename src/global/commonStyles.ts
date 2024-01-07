import {ColorValue} from 'react-native';

type Colors = {
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
    secondary: '#FFF',
    mainText: '#222',
    subText: '#555',
  },
};

export default theme;
