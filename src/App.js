import React, { useState, useEffect } from "react";
import { Layout, Typography } from "antd";
import "./App.css";


function App() {
  const { Header, Footer, Sider, Content } = Layout;
  const { Text, Link } = Typography;
  return (
      <Layout className="ant-layout">
        <Header className="ant-layout-header">
          <Text mark>Food Selector</Text>
        </Header>
        <Content>
          <DisplayData />
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
