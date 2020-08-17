import React, { useState, useEffect } from "react";
import { Layout, Typography, Row, Col } from "antd";
import "./App.css";
import logo from './logo_foodipedia.png';

function App() {
  const { Header, Footer, Sider, Content } = Layout;
  const { Text, Link } = Typography;
  return (
    <Layout className="ant-layout">
      <Header className="ant-layout-header">
        <img src={logo} className="App-logo" alt="logo" />
      </Header>

      <Content>
        <Row>
          <Col span={12}>
            <DisplayData />
          </Col>
          <Col span={12}>
            <DisplayData />
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

export default App;
