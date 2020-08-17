import React, { useState, useEffect } from "react";
import { Layout, Typography, Row, Col , Slider} from "antd";
import "./App.css";
import logo from "./logo_foodipedia.png";
import Chart from "react-google-charts";



function setCarbohydrate(value) {
  return `${value}%`;
}
function setSugar(value) {
  return `${value}%`;
}
function setProtein(value) {
  return `${value}%`;
}
function setFat(value) {
  return `${value}%`;
}

function App() {
  const { Header, Footer, Sider, Content } = Layout;
  const { Title, Link } = Typography;
  return (
    <Layout className="ant-layout">
      <Header className="ant-layout-header">
        <img src={logo} className="App-logo" alt="logo" />
      </Header>

      <Content >
        <Row className="ant-content">
          <Col span={12}>
            <Title level={4}>Carbohydrate</Title>
            <Slider tipFormatter={setCarbohydrate}/>
            <Title level={4}>Sugar</Title>
            <Slider tipFormatter={setSugar}/>
            <Title level={4}>Protein</Title>
            <Slider tipFormatter={setProtein}/>
            <Title level={4}>Fat</Title>
            <Slider tipFormatter={setFat}/>
          </Col>
          <Col span={12}>
            <PieChart />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}



function DisplayData() {
  const [currentTime, setCurrentTime] = useState(0);
  useEffect(() => {
    fetch("/api/foods")
      .then((res) => res.json())
      .then((data) => {
        setCurrentTime(data.time);
      });
  }, []);
  return <p>The current time is {currentTime}.</p>;
}

function PieChart() {
  const pieOptions = {
    title: "",
    pieHole: 0.6,
    slices: [
      {
        color: "#2BB673"
      },
      {
        color: "#d91e48"
      },
      {
        color: "#007fad"
      },
      {
        color: "#e9a227"
      }
    ],
    legend: {
      position: "bottom",
      alignment: "center",
      textStyle: {
        color: "233238",
        fontSize: 18
      }
    },
    tooltip: {
      showColorCode: true
    },
    chartArea: {
      left: 0,
      top: 0,
      width: "100%",
      height: "80%"
    },
    fontName: "Roboto",
    fontSize: 15
  };
  return (
    <Chart
      chartType="PieChart"
      data={[
        ["Sugar", "Carbohydrate", "Fat", "Protein"],
        ["Carbohydrate", 10, 0, 0],
        ["Sugar", 14, 0, 0],
        ["Protein", 12, 0, 0],
        ["Fat", 5.5, 0, 0],
      ]}
      options={pieOptions}
      graph_id="PieChart"
      width={"100%"}
      height={"400px"}
      legend_toggle
    />
  );
}

export default App;
