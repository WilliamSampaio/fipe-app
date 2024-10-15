import React, { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';

const ModalInfo = ({ data }) => {

  const [codigoFipe, setCodigoFipe] = useState(null);
  const [marca, setMarca] = useState(null);
  const [modelo, setModelo] = useState(null);
  const [ano, setAno] = useState(null);
  const [mesReferencia, setMesReferencia] = useState(null);
  const [combustivel, setCombustivel] = useState(null);
  const [valor, setValor] = useState(null);

  useEffect(() => {
    if (data.info != null) {
      setCodigoFipe(data.info.CodigoFipe);
      setMarca(data.info.Marca);
      setModelo(data.info.Modelo);
      setAno(data.info.AnoModelo);
      setMesReferencia(data.info.MesReferencia);
      setCombustivel(data.info.Combustivel);
      setValor(data.info.Valor);
    }
  }, [data])

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={data.modalInfoVisible}
      onRequestClose={() => {
        data.setModalInfoVisible(!data.modalInfoVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Código FIPE: {codigoFipe}</Text>
          <Text style={styles.modalText}>Marca: {marca}</Text>
          <Text style={styles.modalText}>Modelo: {modelo}</Text>
          <Text style={styles.modalText}>Ano: {ano}</Text>
          <Text style={styles.modalText}>Mês de Referência: {mesReferencia}</Text>
          <Text style={styles.modalText}>Combustível: {combustivel}</Text>
          <Text style={styles.modalText}>Valor: {valor}</Text>
          <Pressable
            style={styles.button}
            onPress={() => data.setModalInfoVisible(!data.modalInfoVisible)}>
            <Text style={styles.textStyle}>Fechar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    margin: 10,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#f52727',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '700'
  },
});

export default ModalInfo;