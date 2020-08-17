import React, { useState, useEffect } from "react";
import { Layout, Typography } from "antd";
import "./App.css";

function App() {
  const { Header, Footer, Sider, Content } = Layout;
  const { Text, Link } = Typography;
  return (
    <div className="App">
      <DisplayData />
    </div>
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
