import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import api from './src/Services/api';
import ModalInfo from './src/ModalInfo';

export default function App() {

  const tipos = [
    { value: 'carros', label: 'Carros' },
    { value: 'motos', label: 'Motos' },
    { value: 'caminhoes', label: 'Caminhoẽs' },
  ];

  const [selectedTipo, setSelectedTipo] = useState(tipos[0].value);

  const [marcas, setMarcas] = useState([]);
  const [selectedMarca, setSelectedMarca] = useState(null);

  const [modelos, setModelos] = useState([]);
  const [selectedModelo, setSelectedModelo] = useState(null);

  const [anos, setAnos] = useState([]);
  const [selectedAno, setSelectedAno] = useState(null);

  const [info, setInfo] = useState(null);

  const [modalInfoVisible, setModalInfoVisible] = useState(false);

  useEffect(() => {
    async function loadMarcas() {
      const response = await api.get(`/${selectedTipo}/marcas`);
      setMarcas(response.data);
    }
    loadMarcas();
  }, []);

  useEffect(() => {
    async function loadMarcas() {
      const response = await api.get(`/${selectedTipo}/marcas`);
      setMarcas(response.data);
    }
    loadMarcas();
  }, [selectedTipo]);

  useEffect(() => {
    setSelectedMarca(() => {
      if (marcas.length > 0) {
        return marcas[0].codigo;
      }
      return null;
    });
  }, [marcas]);

  useEffect(() => {
    async function loadModelos() {
      const response = await api.get(`/${selectedTipo}/marcas/${selectedMarca}/modelos`);
      setModelos(response.data.modelos);
    }
    loadModelos();
  }, [selectedMarca]);

  useEffect(() => {
    setSelectedModelo(() => {
      if (modelos.length > 0) {
        return modelos[0].codigo;
      }
      return null;
    });
  }, [modelos]);

  useEffect(() => {
    async function loadAnos() {
      const response = await api.get(`/${selectedTipo}/marcas/${selectedMarca}/modelos/${selectedModelo}/anos`);
      setAnos(response.data);
    }
    loadAnos();
  }, [selectedModelo]);

  useEffect(() => {
    setSelectedAno(() => {
      if (anos.length > 0) {
        return anos[0].codigo;
      }
      return null;
    });
  }, [anos]);

  function getInfo() {
    async function loadInfo() {
      const response = await api.get(`/${selectedTipo}/marcas/${selectedMarca}/modelos/${selectedModelo}/anos/${selectedAno}`);
      setInfo(response.data);
    }
    loadInfo();
    setModalInfoVisible(true);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tabela FIPE</Text>
      <Text style={styles.label}>Tipo de Veículo</Text>
      <Picker
        style={styles.picker}
        selectedValue={selectedTipo}
        onValueChange={(value, index) => {
          setSelectedTipo(value)
        }}
      >
        {tipos.map((v, k) => {
          return <Picker.Item key={k} label={v.label} value={v.value} />
        })}
      </Picker>
      <Text style={styles.label}>Marcas</Text>
      <Picker
        style={styles.picker}
        selectedValue={selectedMarca}
        onValueChange={(value, index) => {
          setSelectedMarca(value)
        }}
      >
        {marcas.map((v) => {
          return <Picker.Item key={v.codigo} label={v.nome} value={v.codigo} />
        })}
      </Picker>
      <Text style={styles.label}>Modelos</Text>
      <Picker
        style={styles.picker}
        selectedValue={selectedModelo}
        onValueChange={(value, index) => {
          setSelectedModelo(value)
        }}
      >
        {modelos.map((v) => {
          return <Picker.Item key={v.codigo} label={v.nome} value={v.codigo} />
        })}
      </Picker>
      <Text style={styles.label}>Anos</Text>
      <Picker
        style={styles.picker}
        selectedValue={selectedAno}
        onValueChange={(value, index) => {
          setSelectedAno(value)
        }}
      >
        {anos.map((v) => {
          return <Picker.Item key={v.codigo} label={v.nome} value={v.codigo} />
        })}
      </Picker>
      <TouchableOpacity style={styles.btn} onPress={getInfo}>
        <Text style={styles.btnLabel}>Visualizar</Text>
      </TouchableOpacity>
      <ModalInfo data={{
        info, modalInfoVisible, setModalInfoVisible
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 20
  },
  label: {
    marginLeft: 20,
    fontSize: 18,
    fontWeight: '500'
  },
  picker: {
    backgroundColor: '#EEE',
    margin: 10,
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8
  },
  btn: {
    margin: 10,
    padding: 20,
    backgroundColor: '#e3893b',
    borderRadius: 15,
    alignItems: 'center'
  },
  btnLabel: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 20,
    fontWeight: 'bold'
  }
});
