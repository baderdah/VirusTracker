import React, {Component} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {StyleSheet, Text, View, Dimensions, Button} from 'react-native';
import virusPin from '../assets/virus.png';
// import Geolocation from '@react-native-community/geolocation';
import * as backgroundGeo from '../utils/BackgroundGeolocationUtils';

import Database from '../services/databaseService';
import server from '../services/authService';

// const db = new Database();

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: {latitude: 32.3243384, longitude: -9.2621789},
      history: [],
      error: null,
    };
  }

  async componentDidMount() {
    const trace = await server.auth.getTrace();
    console.log(trace.response);
    this.setState({
      locations: trace.data,
    });

    console.log('[info] navigator : ', navigator);
    backgroundGeo.BackgroundGeolocation.on('location', location => {
      // handle your locations here
      // to perform long running operation on iOS
      // you need to create background task
      console.log('[INFO] location from map');

      console.log(this.state.history);
      // this.setState({
      //   x: {
      //     latitude: location.latitude,
      //     longitude: location.longitude,
      //   },
      // });

      backgroundGeo.BackgroundGeolocation.startTask(taskKey => {
        // execute long running task
        // eg. ajax post location
        // IMPORTANT: task has to be ended by endTask
        backgroundGeo.BackgroundGeolocation.endTask(taskKey);
      });
    });
  }
  render() {
    const locations = this.state.locations;
    const loc = [{bom: 'sas'}, {bom: 'sas'}, {bom: 'sas'}, {bom: 'sas'}];
    console.log('');
    console.log('');
    console.log('');
    if (locations) {
      console.log('Info lenght ', locations.length);
    }
    console.log('');
    console.log('');
    console.log('');

    return (
      <View style={styles.container}>
        {/* <Button
          title={"me"}
          onPress={() => {
            console.log("clicked");
            navigator.geolocation.getCurrentPosition(
              position => {
                this.setState({
                  x: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                  },
                  error: null
                });
              },
              error => this.setState({ error: error.message })
            );
          }}
        /> */}

        <MapView
          showsPointsOfInterest={false}
          style={styles.mapStyle}
          region={{
            latitude: this.state.x.latitude,
            longitude: this.state.x.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          {locations &&
            locations.map(l => (
              <Marker
                key={l.triceTime}
                icon={virusPin}
                coordinate={{
                  latitude: l.traceLatitude,
                  longitude: l.traceLongitude,
                }}
              />
            ))}
          {/* <Marker
            key={Math.random()}
            icon={virusPin}
            coordinate={this.state.x}
          /> */}
        </MapView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  mapStyle: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
export default Map;
