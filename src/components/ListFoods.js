import React, { useState, useEffect } from "react";
import { List, Avatar, Space, Typography } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import axios from "axios";
import "./ListFoods.css";
import { Empty } from "antd";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

function ListFoods(props) {
  const { Title } = Typography;
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url:
        "/api/foods?269=" +
        props.nutriValue.sugar[0] +
        "&269=" +
        props.nutriValue.sugar[1] +
        "&204=" +
        props.nutriValue.fat[0] +
        "&204=" +
        props.nutriValue.fat[1] +
        "&203=" +
        props.nutriValue.protein[0] +
        "&203=" +
        props.nutriValue.protein[1] +
        "&205=" +
        props.nutriValue.carbohydrate[0] +
        "&205=" +
        props.nutriValue.carbohydrate[1],
    }).then((response) => {
      setFoods(response.data["_embedded"]);
    });
  }, [props.nutriValue]);

  const listData = [];
  for (const food of foods) {
    const nutrientsInfo = food["nutrients"]
      .map((x) => x["name"] + ": " + x["nutrient_grams_per_100"] + "g")
      .join(" | ");
    listData.push({
      title: food.name,
      avatar:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      description: "Nutritional Database Code: " + food.code,
      content: nutrientsInfo,
    });
  }
  props.shiftUpFoodChange();
  return (
    <div>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
          },
          pageSize: 3,
        }}
        dataSource={listData}
        locale={{
          emptyText: (
            <Empty description="No foods available for the selected values" />
          ),
        }}
        footer={
          <div>
            <b>Disclaimer:</b> The provided information need not be accurate.
            This website is for demo purpose only.
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
                src={
                  "https://source.unsplash.com/1600x900/?" +
                  item.title.split(",")
                }
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

export default ListFoods;
