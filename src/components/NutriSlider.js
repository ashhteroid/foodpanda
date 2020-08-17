import React, { useState, useEffect } from "react";
import { Layout, Typography, Row, Col, Slider } from "antd";
import PieChart from "./PieChart";
import "./NutriSlider.css";

function NutriSlider(props) {
  const { Title } = Typography;
  const [carbohydrate, setCarbohydrate] = useState(50);
  const [sugar, setSugar] = useState(10);
  const [protein, setProtein] = useState(60);
  const [fat, setFat] = useState(40);

  function formatter(value) {
    return `${value}%`;
  }

  function onAfterChange(value) {
    props.onChange();
    console.log("root on change", { fat, sugar, carbohydrate, protein });
  }

  return (
    <Row className="ant-content">
      <Col span={12}>
        <Title level={4}>Carbohydrate</Title>
        <Slider
          defaultValue={fat}
          tipFormatter={formatter}
          onChange={setCarbohydrate}
          onAfterChange={onAfterChange}
        />
        <Title level={4}>Sugar</Title>
        <Slider
          defaultValue={fat}
          tipFormatter={formatter}
          onChange={setSugar}
          onAfterChange={onAfterChange}
        />
        <Title level={4}>Protein</Title>
        <Slider
          defaultValue={fat}
          tipFormatter={formatter}
          onChange={setProtein}
          onAfterChange={onAfterChange}
        />
        <Title level={4}>Fat</Title>
        <Slider
          defaultValue={fat}
          tipFormatter={formatter}
          onChange={setFat}
          onAfterChange={onAfterChange}
        />
      </Col>
      <Col span={12}>
        <PieChart />
      </Col>
    </Row>
  );
}

export default NutriSlider;
