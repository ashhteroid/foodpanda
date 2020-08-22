import React, { useState, useEffect } from "react";
import { Layout, Typography, Row, Col, Slider } from "antd";
import PieChart from "./PieChart";
import "./NutriSlider.css";

function NutriSlider(props) {
  const { Title } = Typography;
  const [carbohydrate, setCarbohydrate] = useState(props.defaultSliderValues.carbohydrate);
  const [sugar, setSugar] = useState(props.defaultSliderValues.sugar);
  const [protein, setProtein] = useState(props.defaultSliderValues.protein);
  const [fat, setFat] = useState(props.defaultSliderValues.fat);
  const maxval = 300;
  function formatter(value) {
    return `${value}`;
  }

  function onAfterChange() {
    props.shiftUpNutritionChange({ 
      "fat":fat , "sugar":sugar, "carbohydrate":carbohydrate, "protein":protein
    });
  }
  return (
    <Row className="ant-content">
      <Col span={12}>
        <Title level={4}>Carbohydrate</Title>
        <Slider
          range
          step={1}
          max={maxval}
          defaultValue={carbohydrate}
          tipFormatter={formatter, formatter}
          onChange={setCarbohydrate}
          onAfterChange={onAfterChange}
        />
        <Title level={4}>Sugar</Title>
        <Slider
          range
          step={1}
          max={maxval}
          defaultValue={sugar}
          // tipFormatter={formatter, formatter}
          onChange={setSugar}
          onAfterChange={onAfterChange}
        />
        <Title level={4}>Protein</Title>
        <Slider
          range
          step={1}
          max={maxval}
          defaultValue={protein}
          tipFormatter={formatter, formatter}
          onChange={setProtein}
          onAfterChange={onAfterChange}
        />
        <Title level={4}>Fat</Title>
        <Slider
          range
          step={1}
          max={maxval}
          defaultValue={fat}
          tipFormatter={formatter, formatter}
          onChange={setFat}
          onAfterChange={onAfterChange}
        />
      </Col>
      <Col span={12}>
        <PieChart valuesForPie={{"fat":fat , "sugar":sugar, "carbohydrate":carbohydrate, "protein":protein}} />
      </Col>
    </Row>
  );
}

export default NutriSlider;
