import React from 'react';
import {Text, View, Button, StyleSheet, Image} from 'react-native';
import warnning from '../assets/emergency.png';
import Database from '../services/databaseService';
import authService from '../services/authService';
const db = new Database();

class UploadData extends React.Component {
  uploadHandler = async () => {
    const traces = await db.listTrace();
    await authService.auth.uploadTraces(this.props.route.params.jwt, traces);
    this.props.navigation.navigate('News');
  };

  render() {
    return (
      <View style={styles.container}>
        <Image source={warnning} />
        <Text style={styles.text}>
          By clicking this button all the traces will be uploaded to the server
          and the owner of this device gonna be considred as a confirmed case of
          the virus
        </Text>
        <Button
          onPress={this.uploadHandler}
          color={'red'}
          title={'Upload Data'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    width: '80%',
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default UploadData;
