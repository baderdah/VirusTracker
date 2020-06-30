import React from "react";
import {
  AreaChart,
  XAxis,
  Grid,
  BarChart,
  LineChart,
  YAxis
} from "react-native-svg-charts";
import { View, ScrollView, Text } from "react-native";
import * as scale from "d3-scale";
import * as shape from "d3-shape";
import dateFns from "date-fns";
import Moment, { min } from "moment";
import setHours from "date-fns/setHours";
import format from "date-fns/format";

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { title, barsColor, labelColor, valueLabel } = this.props;
    const data = this.props.data.map(d => {
      return { date: new Date(d.Date).getTime(), value: d[valueLabel] };
    });

    const l = data.length;
    const contentInset = { top: 20, bottom: 20 };
    return (
      <View style={{ flex: 1, width: "100%" }}>
        <Text
          style={{
            fontSize: 25,
            textAlign: "center",
            marginVertical: 8,
            color: labelColor
          }}
        >
          {title}
        </Text>
        <View
          style={{
            flexDirection: "row",
            height: 200
          }}
        >
          <YAxis
            data={data}
            contentInset={contentInset}
            svg={{
              fill: "grey",
              fontSize: 10
            }}
            yAccessor={({ item }) => item.value}
            numberOfTicks={10}
            formatLabel={value => value}
            // style={{ paddingBottom: 20 }}
          />

          <ScrollView
            ref={ref => {
              this.scrollView = ref;
            }}
            onContentSizeChange={() =>
              this.scrollView.scrollToEnd({ animated: true })
            }
            style={{
              width: "100%",
              marginLeft: 5,
              padding: 5
            }}
            horizontal={true}
          >
            <View style={{ height: 200, width: l * 20 }}>
              <BarChart
                style={{ flex: 1 }}
                data={data}
                yAccessor={({ item }) => item.value}
                // xAccessor={({ item }) => item.date}
                xScale={scale.scaleTime}
                contentInset={{ top: 10, bottom: 4 }}
                svg={{ fill: barsColor, stroke: "rgba(186, 186, 186, 0.2)" }}
                curve={shape.curveLinear}
              >
                <Grid />
              </BarChart>

              <XAxis
                data={data}
                svg={{
                  fill: "black",
                  fontSize: 8,
                  // fontWeight: "bold",
                  rotation: 20,
                  originY: 80,
                  y: 5
                }}
                xAccessor={({ item }) => item.date}
                scale={scale.scaleTime}
                style={{ marginHorizontal: 0, height: 30 }}
                contentInset={{ left: 15, right: 25 }}
                formatLabel={value => format(value, "dd MMM")}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
export default Chart;

// render() {
//   const dates = this.props.data.map(d => d.date);

//   //    const data = this.props.data.map((d, index) => d.Confirmed);
//   const data = [
//     { date: 1577421956000, value: 0.36 },
//     { date: 1577940356000, value: 0.36 },
//     { date: 1577508356000, value: 0.36 },
//     { date: 1577594756000, value: 0.36 },
//     { date: 1577681156000, value: 0.36 },
//     { date: 1577767556000, value: 0.36 },
//     { date: 1577853956000, value: 0.36 },
//     { date: 1578026756000, value: 0.34 },
//     { date: 1578113156000, value: 0.36 },
//     { date: 1578199556000, value: 0.29 },
//     { date: 1578285956000, value: 0.26 },
//     { date: 1578458756000, value: 0.48 }
//   ];
//   console.log(data);
//   const l = data.length;

//   const contentInset = { top: 20, bottom: 20 };
//   return (
//     <View
//       style={{
//         flexDirection: "row",
//         height: 200
//       }}
//     >
//       <YAxis
//         data={data}
//         contentInset={contentInset}
//         svg={{
//           fill: "grey",
//           fontSize: 10
//         }}
//         yAccessor={({ item }) => item.value}
//         numberOfTicks={10}
//         formatLabel={value => value}
//       />
//       <ScrollView
//         ref={ref => {
//           this.scrollView = ref;
//         }}
//         onContentSizeChange={() =>
//           this.scrollView.scrollToEnd({ animated: true })
//         }
//         style={{
//           width: "100%"
//         }}
//         horizontal={true}
//       >
//         <View
//           style={{
//             height: 200,
//             width: l * 50
//           }}
//         >
//           <BarChart
//             style={{ flex: 1 }}
//             data={data}
//             gridMin={0}
//             // xAccessor={({ item }) => {
//             //   return item.date;
//             // }}
//             yAccessor={({ item }) => item.value}
//             contentInset={{ top: 10, bottom: 10 }}
//             svg={{ stroke: "rgb(134, 65, 244)" }}
//           >
//             <Grid />
//           </BarChart>
//           <XAxis
//             style={{ marginHorizontal: -10 }}
//             data={data}
//             xAccessor={({ item }) => {
//               return item.date;
//             }}
//             numberOfTicks={6}
//             // scale={scale.scaleTime}
//             formatLabel={value => {
//               console.log("label value", value);
//               console.log("label", new Date(value));
//               return value;
//             }}
//             contentInset={{ left: 35, right: 35 }}
//             svg={{ fontSize: 10, fill: "black" }}
//           />
//         </View>
//       </ScrollView>
//     </View>
//   );
// }
