//@flow

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity
} from "react-native";
import HCE from "react-native-nfc-hce";

const window = Dimensions.get("window");

export default class App extends Component {
  state = {
    support: false,
    enabled: false,
    warnText: null,
    number: 0 
  };

  componentDidMount = () => {
    const { support, enabled } = HCE.supportNFC();
    console.log("enable: ", HCE.supportNFC());
    if (support) {
      this.setState({ support, enabled });
      if (!enabled) {
        this.setState({ warnText: "請開啟ＮＦＣ" });
      } else {
        this.setState({ warnText: null });
      }
    } else {
      this.setState({ warnText: "你的裝置不支援ＮＦＣ" });
    }

    HCE.listenNFCStatus(enabled => {
      console.log("NFC enabled: ", enabled);
      this.setState({ enabled, warnText: enabled ? null : "Turn on ＮＦＣ" });
    });
  };

  _onChangeText = text => {
    if (text.length > 0) {
      HCE.setCardContent(text);
    }
  };

  _onPress= () => {
    this.setState({number: 1375463})
  }

  render() {
    const { warnText, number } = this.state;

    return (
      <View style={styles.container}>
        {warnText ? (
          <Text style={styles.text}>{warnText}</Text>
        ) : (
          <TextInput
            style={styles.input}
            placeholder={"Enter Email "}
            onChangeText={this._onChangeText}
            returnKeyType={"done"}
          />
        )}
        <TouchableOpacity onPress={this._onPress} style={styles.buttonContainer}>
					<Text style={styles.buttonText}>Smart ID</Text>
				</TouchableOpacity>
        <Text style={styles.text}>{number}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: { fontSize: 24 },
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  input: {
    width: window.width - 40,
    fontSize: 24,
    padding: 5,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1
  },
  buttonContainer: {
		backgroundColor: "#34495e",
		marginTop: 10,
		marginBottom: 10,
		padding: 10,
		borderRadius: 5,
		alignItems: "center"
	},
	buttonText: {
		color: "#fff",
		fontSize: 24
  },
});
