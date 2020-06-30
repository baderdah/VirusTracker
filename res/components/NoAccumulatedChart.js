import React from "react";
import Chart from "./Chart";
import { Value } from "react-native-reanimated";

class NoAccumulatedChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { valueLabel, data } = this.props;
    const exData = [...this.props.data];
    let last = 0;
    let templast = 0;
    const l = data.length;
    data.reduce((previousValue, currentValue, currentIndex) => {});
    // data.map((d, index) => {
    //   if (index === 0) index = index + 1;
    //   console.log(d["Confirmed"], "==>", exData[index - 1]["Confirmed"]);
    //   console.log(d["Confirmed"] - exData[index - 1]["Confirmed"]);
    // });
    return (
      <Chart
        title={this.props.title}
        barsColor={this.props.barsColor}
        labelColor={this.props.labelColor}
        valueLabel={"Confirmed"}
        style={this.props.style}
        data={data}
      />
    );
  }
}
export default NoAccumulatedChart;
