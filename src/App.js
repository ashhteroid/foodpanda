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
  const defaultValues = { 
    "fat":[0,100] , "sugar":[0,100], "carbohydrate":[0,100], "protein":[50,100]
  }
  const [nutritionValue, setNutritionValue] = useState(defaultValues);
  
  function onFoodChange() {
    setAnimation("cobweb");
  }

  function onSliderChange(values) {
    setAnimation("fountain");
    console.log(values)
    setNutritionValue(values);
  }
  // {/* <ParticlesBg type={animation} bg={true} /> */}

  return (
    <Layout className="ant-layout">
      <Header className="ant-layout-header">
        <img src={logo} className="App-logo" alt="logo" />
      </Header>
      <Content>
        <Divider>
          <Title level={3}>Nutrition</Title>
        </Divider>
        <NutriSlider shiftUpNutritionChange={onSliderChange} defaultSliderValues={defaultValues}/>
        <Divider>
          <Title level={3}>Foods</Title>
        </Divider>
        <ListFoods shiftUpFoodChange={onFoodChange} nutriValue={nutritionValue} defaultNutriValue={defaultValues}/>
      </Content>
    </Layout>
  );
}



export default App;
