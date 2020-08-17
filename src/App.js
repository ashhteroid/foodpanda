import React, { useState, useEffect } from "react";
import { Layout, Divider, Typography } from "antd";
import "./App.css";
import logo from "./logo_foodipedia3.png";
import NutriSlider from "./components/NutriSlider";
import ListFoods from "./components/ListFoods";
import ParticlesBg from "particles-bg";

const { Title } = Typography;

function App() {
  const { Header, Footer, Sider, Content } = Layout;
  const [animation, setAnimation] = useState("cobweb");

  function onNutritionChange() {
    setAnimation("fountain");
  }

  function onFoodChange() {
    setAnimation("cobweb");
  }

  return (
    <Layout className="ant-layout">
      <ParticlesBg type={animation} bg={true} />
      <Header className="ant-layout-header">
        <img src={logo} className="App-logo" alt="logo" />
      </Header>
      <Content>
        <Divider>
          <Title level={3}>Nutrition</Title>
        </Divider>
        <NutriSlider onChange={onNutritionChange} />
        <Divider>
          <Title level={3}>Foods</Title>
        </Divider>
        <ListFoods onChange={onFoodChange} />
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

export default App;
