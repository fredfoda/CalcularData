import React, { useState } from 'react';
import { Text, TouchableOpacity, SafeAreaView, TextInput, View, StyleSheet, } from "react-native";

function App() {
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const [difference, setDifference] = useState(0);
  const [error, setError] = useState('');

  const handleDate1Change = (text) => {
    setDate1(text);
  };

  const handleDate2Change = (text) => {
    setDate2(text);
  };
  const formatDateString = (inputDate) => {
    let formattedDate = inputDate;
    if (formattedDate.length === 2 || formattedDate.length === 5) {
      formattedDate += '/';
    }
    return formattedDate.slice(0, 10);
  };



  const calculateDifference = () => {
    if (!date1 || !date2) {
      setError('Preencha os campos de data');
      return;
    }

    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regex.test(date1) || !regex.test(date2)) {
      setError('Use apenas números para a data');
      return;
    }

    setError('');

    const [day1, month1, year1] = date1.split('/');
    const [day2, month2, year2] = date2.split('/');

    const date1Obj = new Date(year1, month1 - 1, day1);
    const date2Obj = new Date(year2, month2 - 1, day2);

    const timeDifference = Math.abs(date2Obj.getTime() - date1Obj.getTime());
    const differenceInDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

    setDifference(differenceInDays.toString());
  };

  const clearFields = () => {
    setDate1('');
    setDate2('');
    setDifference('');
    setError('');
  };


  return (
    <SafeAreaView style={styles.container}>
    <Text style={styles.title}>Calculadora de diferença de dias</Text>
    <View style={styles.inputContainer}>
      <Text>Data 1:</Text>
      <TextInput
        style={styles.input}
        value={date1}
        onChangeText={handleDate1Change}
      />
    </View>
    <View style={styles.inputContainer}>
      <Text>Data 2:</Text>
      <TextInput
        style={styles.input}
        value={date2}
        onChangeText={handleDate2Change}
      />
    </View>
    <TouchableOpacity style={styles.button} onPress={calculateDifference}>
      <Text style={styles.buttonText}>Calcular</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={clearFields}>
      <Text style={styles.buttonText}>Limpar</Text>
    </TouchableOpacity>
    <View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Text>Diferença em dias: {difference}</Text>
    </View>
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    padding: 5,
    width: 200,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  }
})

export default App;
