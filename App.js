
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  FlatList,
  StyleSheet,
  Text,
  Button,
  View,
  TextInput,
} from 'react-native';

const App = () => {
  //investment payload -----
  const apiJson = [
    {
      "share": "L&T",
      "buy": 100.00,
      "sell": 112.00
    },
    {
      "share": "NHPC",
      "buy": 25.60,
      "sell": 28.80
    },
    {
      "share": "SBICard",
      "buy": 80.00,
      "sell": 85.40
    },
    {
      "share": "Appollo",
      "buy": 250.00,
      "sell": 195.00
    },
    {
      "share": "Edelweiss",
      "buy": 290.24,
      "sell": 62.80
    },
    {
      "share": "ITC",
      "buy": 150.95,
      "sell": 244.95
    },
    {
      "share": "TCS",
      "buy": 456.00,
      "sell": 561.00
    },
    {
      "share": "CEAT",
      "buy": 200.00,
      "sell": 205.44
    },
    {
      "share": "HDFCBank",
      "buy": 806.00,
      "sell": 1008.50
    },
    {
      "share": "PowerGrid",
      "buy": 190.00,
      "sell": 565.45
    },
    {
      "share": "AXISBank",
      "buy": 30.50,
      "sell": 80.54
    },
    {
      "share": "BajajFinsv",
      "buy": 31.60,
      "sell": 81.65
    },
    {
      "share": "CIPLA",
      "buy": 140.00,
      "sell": 157.45
    },
    {
      "share": "EKC",
      "buy": 80.50,
      "sell": 88.50
    },
    {
      "share": "EMCO",
      "buy": 25.60,
      "sell": 45.00
    }
  ];

  const [inputValue, setInputValue] = React.useState();
  const [dataSource, setDataSource] = useState([]);
  const [apiData, setDataApi] = useState(apiJson);
  const [displayValue, setDisplayValue] = useState({
    profit: 0,
    invested: 0
  });
// get investment input------
  const onBtnPress = () => {
    let displayList = [];
    apiData.forEach(element => {
      element['profit'] = element.sell - element.buy //  creating new variable to get profit by osingle share ---
      displayList.push(element);
    });
    displayList.sort((a, b) => { //  Sorting to get descending profit list ---
      if (a.profit > b.profit) {
        return -1;
      }
      if (a.profit < b.profit) {
        return 1;
      }
      return 0;
    });
    doInvestment(displayList, inputValue);
  }
  // Logic to implement investment formula ------
  const doInvestment = (list, inputValue) => {
    let investedShare = [];
    let totalProfit = 0;
    let totalInvestment = 0;
    let remainingAmount = inputValue;
    list.forEach(element => {
      // remove loss and invest only with remaining investment amount ---
      if (remainingAmount > element.buy && element.profit > 0) {
        investedShare.push(element);
        totalProfit += element.profit; // getting total profit by valid investment---
        totalInvestment = totalInvestment + element.buy; // getting total valid investment ---
        remainingAmount = remainingAmount - element.buy;
      }
    });

    const displayItem = {
      invested: totalInvestment,
      profit: totalProfit
    }
    setDisplayValue(displayItem);
    setDataSource(investedShare);
  }
  return (
    <SafeAreaView >
      <ScrollView>
        <Text style={styles.maxText}>Maximum Profit</Text>
        <Text style={styles.maxText}>Amount:</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setInputValue(text)}
          value={inputValue}
          placeholder="Enter Investment Amount"
          keyboardType='numeric'
        />
        <View style={styles.btn}>
          <Button
            title="Calculate"
            color="#808080"
            onPress={onBtnPress}
          />
        </View>

        <Text style={styles.investedShareTxt}>Invested Share:</Text>
        <View style={{ flex: 1, flexDirection: 'row', alignSelf: "center", marginTop: 10 }}>
          <Text style={{ margin: 10, width: 100 }}>Share</Text>
          <Text style={{ margin: 10, width: 70 }}>Buy</Text>
          <Text style={{ margin: 10, width: 70 }}>Sell</Text>
          <Text style={{ margin: 10, width: 70 }}>Profit</Text>
        </View>

        <FlatList
          data={dataSource}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'row', alignSelf: "center", marginTop: 10 }}>
              <Text style={{ margin: 10, width: 100 }}>{item.share}</Text>
              <Text style={{ margin: 10, width: 70 }}>{item.buy}</Text>
              <Text style={{ margin: 10, width: 70 }}>{item.sell}</Text>
              <Text style={{ margin: 10, width: 70 }}>{(item.sell - item.buy).toFixed(2)}</Text>
            </View>
          )}
          //Setting the number of column
          numColumns={1}
          keyExtractor={(item, index) => index}
        />

        <Text style={styles.investedShareTxt}>Total Invested: {displayValue.invested.toFixed(2)}</Text>
        <Text style={styles.investedShareTxt}>Total Profit: {displayValue.profit.toFixed(2)}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  maxText: {
    marginTop: 2,
    fontSize: 28,
    textAlign: 'center',
    color: 'blue'

  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10
  },
  btn: {
    width: 100,
    alignSelf: 'center'
  },
  investedShareTxt: {
    fontSize: 18,
    marginTop: 10,
    marginLeft: 15
  }

});

export default App;
