import React, {useState} from 'react';

import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import Cronometro from './src/crono.png';

let timer = null;
let ss = 0;
let mm = 0;
let hh = 0;

const App = () => {
  const [numero, setNumero] = useState(0);
  const [botao, setBotao] = useState('Iniciar');
  const [ultimo, setUltimo] = useState(null);

  const iniciar = () => {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
      setBotao('Iniciar');
    } else {
      timer = setInterval(() => {
        ss++;

        if (ss === 60) {
          ss = 0;
          mm++;
        }
        if (mm === 60) {
          mm = 0;
          hh++;
        }

        let format =
          (hh < 10 ? '0' + hh : hh) +
          ':' +
          (mm < 10 ? '0' + mm : mm) +
          ':' +
          (ss < 10 ? '0' + ss : ss);

        setNumero(format);
      }, 1000);

      setBotao('Parar');
    }
  };
  const limpar = () => {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    }

    setUltimo(numero);
    setNumero(0);
    ss = 0;
    mm = 0;
    hh = 0;
    setBotao('Iniciar');
  };

  return (
    <View style={styles.area}>
      <Image source={Cronometro} />
      <Text style={styles.timer}>{numero === 0 ? '00:00:00' : numero}</Text>

      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.btn} onPress={iniciar}>
          <Text style={styles.btnText}>{botao}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={limpar}>
          <Text style={styles.btnText}>Limpar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.areaUltima}>
        <Text style={styles.textCorrida}>
          {ultimo && `Ultimo tempo: ${ultimo}`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00aeef',
  },
  timer: {
    marginTop: -160,
    fontSize: 45,
    fontWeight: 'bold',
    color: '#fff',
  },
  btnArea: {
    flexDirection: 'row',
    marginTop: 130,
    height: 40,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 40,
    margin: 17,
    borderRadius: 9,
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00aeef',
  },
  areaUltima: {
    marginTop: 40,
  },
  textCorrida: {
    fontSize: 23,
    color: '#fff',
    fontStyle: 'italic',
  },
});

export default App;
