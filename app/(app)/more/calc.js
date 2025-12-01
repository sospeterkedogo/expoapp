import React from "react";
import { Button, Text, TextInput, View } from "react-native";



function calculateResult(num1, num2, operator) {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    if (isNaN(n1) || isNaN(n2)) return 'Invalid input';
    switch (operator) {
      case '+':
        return n1 + n2;
      case '-':
        return n1 - n2;
      case '*':
        return n1 * n2;
      case '/':
        return n1 / n2;
      default:
        return 'Invalid operator';
    }
  } 

export default function Calculator() {
    const [input1, setInput1] = React.useState('');
    const [input2, setInput2] = React.useState('');
    const [operator, setOperator] = React.useState('');
    const [result, setResult] = React.useState(null);
    
    const handleCalculate = () => {
        const res = calculateResult(input1, input2, operator);
        setResult(res);
    }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 , marginBottom: 10 , width: 200, paddingLeft: 8}}
          onChangeText={(text) => setInput1(text)}
          value={input1}
          placeholder="Enter number"
          keyboardType="numeric"
        />
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 , marginBottom: 10 , width: 200, paddingLeft: 8}}
          onChangeText={(text) => setOperator(text)}
          value={operator}
          placeholder="Enter operator"
        />
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10 , width: 200, paddingLeft: 8 }}
          onChangeText={(text) => setInput2(text)}
          value={input2}
          placeholder="Enter number"
          keyboardType="numeric"
        />
        <Button title="Calculate" onPress={handleCalculate} style={{ width: 200, height: 40, backgroundColor: 'blue', color: 'white'}}/>
        {result !== null && (
          <Text style={{ fontSize: 20, marginTop: 20 }}>Result: {result}</Text>
        )}
        
    </View>
  );
}