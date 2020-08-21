import React, { useState, useEffect } from "react";
import { List, Avatar, Space, Typography } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import "./ListFoods.css";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

function ListFoods() {
  const { Title } = Typography;
  const [foods, setFoods] = useState("");
  useEffect(() => {
    fetch("/api/foods?269=0&269=150&204=0&204=150&203=9&203=150&205=0&205=150")
      .then((res) => res.json())
      .then((data) => {
        setFoods(data["_embedded"]);
      });
  }, []);

  const listData = [];
  let i = 0;
  console.log(foods);
  for (const food of foods) {
    if (i === 25) {
      break;
    }
    console.log(food);
    const nutrientsInfo = food["nutrients"]
      .map((x) => x["name"] + ": " + x["nutrient_grams_per_100"] + "g")
      .join(" | ");
    // console.log(nutrientsInfo);
    listData.push({
      title: food.name,
      avatar:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      description: "Nutritional Database Code: " + food.code,
      content: nutrientsInfo,
    });
    i++;
  }

  return (
    <div>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={listData}
        footer={
          <div>
            <b>ant design</b> footer part
          </div>
        }
        renderItem={(item) => (
          <List.Item
            key={item.title}
            actions={[
              <IconText
                icon={StarOutlined}
                text="156"
                key="list-vertical-star-o"
              />,
              <IconText
                icon={LikeOutlined}
                text="156"
                key="list-vertical-like-o"
              />,
              <IconText
                icon={MessageOutlined}
                text="2"
                key="list-vertical-message"
              />,
            ]}
            extra={
              <img
                width={272}
                alt="logo"
                src="https://source.unsplash.com/1600x900/?food,meals"
              />
            }
          >
            <List.Item.Meta
              title={<b>{item.title}</b>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
    </div>
  );
}

function DisplayData() {
  const [currentTime, setCurrentTime] = useState(0);
  useEffect(() => {
    fetch("/api/foods")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);
  return <p>The current time is {currentTime}.</p>;
}

export default ListFoods;
