//comment test git branch 
// test branch 2
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import Card from '../components/Card';
import * as newsService from '../services/newsService';
import Chart from '../components/Chart';
import NoAccumulatedChart from '../components/NoAccumulatedChart';

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      datalength: 0,
      lastNews: {},
      state: {},
    };
  }

  async componentDidMount() {
    const data = await newsService.getNews();
    this.setState({
      data,
      datalength: data.length,
      lastNews: data[data.length - 1],
    });

    console.log('last news ', this.state.lastNews);
  }

  askedForAuthPressed = () => {
    const now = Date.now();
    let authRequest = {...this.state.authRequest};
    if (authRequest) {
      console.log(now, authRequest.lastPressed);
      if (now - authRequest.lastPressed < 1000) {
        authRequest.lastPressed = now;
        authRequest.count = authRequest.count + 1;
        console.log(authRequest.count);
      } else {
        authRequest.lastPressed = now;
        authRequest.count = 1;
        console.log('restart');
      }
    } else {
      authRequest.lastPressed = now;
      authRequest.count = 1;
    }
    if (authRequest.count === 3) {
      console.log('welcom');
      this.props.navigation.navigate('Authentification');
    }
    this.setState({authRequest});
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        style={styles.ScrollContainer}>
        {/* <View style={styles.container}> */}
        <View style={styles.row1}>
          <TouchableWithoutFeedback onPress={this.askedForAuthPressed}>
            <Card style={styles.info}>
              <Text style={styles.infoTitle}>Maroc</Text>
              <Text style={styles.infoBody}>Coronavirus statistic</Text>
              <Text style={styles.infoFooter}>le 25/05/2020</Text>
            </Card>
          </TouchableWithoutFeedback>

          <View style={styles.leftContainer}>
            <Card style={styles.totalCases}>
              <Text style={styles.deathLabel}>Total death</Text>
              <Text style={styles.deathValue}>
                {this.state.lastNews.Deaths}
              </Text>
            </Card>
            <Card
              onPress={() => console.log('pressed')}
              style={styles.totalCases}>
              <Text style={styles.recoveredLabel}>Total recovered</Text>
              <Text style={styles.recoveredValue}>
                {this.state.lastNews.Recovered}
              </Text>
            </Card>
          </View>
        </View>
        <View style={styles.row2}>
          <Card style={{backgroundColor: 'white'}}>
            <Text style={styles.casesLabel}>Total confirmed cases</Text>
            <Text style={styles.casesValue}>
              {this.state.lastNews.Confirmed}
            </Text>
          </Card>
        </View>
        <View style={styles.row3}>
          <Card style={{flex: 1, backgroundColor: 'white'}}>
            <Chart
              title="accumulated Recovred"
              barsColor="rgba(137, 202, 44, 0.7)"
              labelColor="rgb(137, 202, 44)"
              valueLabel="Recovered"
              style={{matgin: 10}}
              data={this.state.data}
            />
          </Card>
        </View>
        <View style={styles.row3}>
          <Card style={{flex: 1, backgroundColor: 'white'}}>
            <Chart
              title="accumulated casses"
              barsColor="rgba(53, 203, 255, 0.7)"
              labelColor="rgb(53, 203, 255)"
              valueLabel="Confirmed"
              style={{matgin: 10}}
              data={this.state.data}
            />
          </Card>
        </View>
        <View style={styles.row3}>
          <Card style={{flex: 1, backgroundColor: 'white'}}>
            <Chart
              title="accumulated Death"
              barsColor="rgba(255, 79, 79, 0.7)"
              labelColor="rgb(255, 79, 79)"
              valueLabel="Deaths"
              style={{matgin: 10}}
              data={this.state.data}
            />
          </Card>
        </View>
      </ScrollView>
    );
  }
}

const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  ScrollContainer: {},
  container: {
    flex: 1,
  },
  row1: {
    // flex: 1,
    flexDirection: 'row',
    height: Math.round(height / 3),
  },
  row2: {
    // flex: 1,
    height: Math.round(height / 7),
  },
  info: {
    flex: 1,
    // height: "60%",
    backgroundColor: 'white',
  },
  leftContainer: {
    flex: 1,
  },
  totalCases: {
    height: Math.round(height / 7),
    backgroundColor: 'white',
  },
  infoTitle: {
    fontSize: 30,
    color: '#fcbd64',
    fontWeight: 'bold',
    marginVertical: 8,
  },
  infoBody: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 8,
    color: '#606060',
  },
  infoFooter: {
    textAlign: 'center',
    color: '#ff9901',
  },
  deathLabel: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 8,
    color: '#ff4f4f',
  },
  deathValue: {
    fontSize: 20,
    textAlign: 'center',
  },
  recoveredLabel: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 8,
    color: '#89ca2c',
  },
  recoveredValue: {
    fontSize: 20,
    textAlign: 'center',
  },
  casesLabel: {
    fontSize: 25,
    textAlign: 'center',
    marginVertical: 8,
    color: '#35cbff',
  },
  casesValue: {
    fontSize: 20,
    textAlign: 'center',
  },
  row3: {
    height: 300,
  },
});

export default News;
