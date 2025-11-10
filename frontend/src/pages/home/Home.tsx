import { Row, Col, Card, Typography, List, Button, theme } from "antd";
import {
  SearchOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

const data = [
  {
    title: "What is this platform?",
    description:
      "This platform is a web-based content management system designed for Information Systems students. It gathers and organizes video learning references for each course, allowing students to learn more interactively, efficiently, and collaboratively.",
  },
  {
    title: "Who can add video references?",
    description:
      "Any registered user can contribute by adding new video links for specific courses.",
  },
  {
    title: "How can I add a new video?",
    description: (
      <ul>
        <li>1. Log in to your account</li>
        <li>2. Choose the course where you want to add a reference</li>
        <li>3. Click the “Add Video” button</li>
        <li>4. Enter the video title, channel name, and YouTube link</li>
        <li>5. Click Save</li>
      </ul>
    ),
  },
  {
    title: "Does the video link have to come from YouTube?",
    description: "For now, the platform supports YouTube links only.",
  },
];

const services = [
  {
    name: "Centralized access to video references",
    user: true,
    contributor: true,
  },
  {
    name: "Relevant search & filter",
    user: true,
    contributor: true,
  },
  {
    name: "Personal bookmark",
    user: false,
    contributor: true,
  },
  {
    name: "Video contribution",
    user: false,
    contributor: true,
  },
];

export const Home = () => {
  const {
    token: {
      colorBgContainer,
      borderRadiusLG,
      boxShadow,
      colorSuccess,
      colorError,
    },
  } = theme.useToken();
  const navigate = useNavigate();

  return (
    <>
      <section
        style={{
          padding: "30px 0",
          marginBottom: 60,
          textAlign: "center",
          lineHeight: "3rem",
        }}
      >
        <Title style={{ fontSize: "3.4rem" }}>Digsboard</Title>
        <Button
          type="primary"
          size="large"
          icon={<SearchOutlined />}
          iconPosition={"end"}
          onClick={() => navigate("/references")}
        >
          Explore
        </Button>
        <Paragraph
          style={{ fontSize: "1rem", maxWidth: 500, margin: "24px auto 0px" }}
        >
          A web-based learning platform that provides video references for every
          Information Systems course, making learning easier, more structured,
          and accessible anytime
        </Paragraph>
      </section>

      <section
        style={{
          margin: "0 -48px 30px",
          padding: "30px 48px 60px",
          lineHeight: "3rem",
          boxShadow: boxShadow,
          background: colorBgContainer,
        }}
      >
        <Title>Service</Title>
        <Row gutter={[30, 30]}>
          <Col span={24} md={12}>
            <Card
              title={<Title level={4}>User</Title>}
              hoverable
              onClick={() => navigate("/references")}
            >
              <ul>
                {services.map((service, index) => (
                  <li
                    key={index}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p>{service.name}</p>
                    <span>
                      {service.user ? (
                        <CheckOutlined style={{ color: colorSuccess }} />
                      ) : (
                        <CloseOutlined style={{ color: colorError }} />
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </Col>
          <Col span={24} md={12}>
            <Card
              title={<Title level={4}>Contributor</Title>}
              hoverable
              onClick={() => navigate("/auth")}
            >
              <ul>
                {services.map((service, index) => (
                  <li
                    key={index}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p>{service.name}</p>
                    <span>
                      {service.contributor ? (
                        <CheckOutlined style={{ color: colorSuccess }} />
                      ) : (
                        <CloseOutlined style={{ color: colorError }} />
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </Col>
        </Row>
      </section>

      <section
        style={{
          padding: "30px 0 0",
          lineHeight: "3rem",
        }}
      >
        <Title>About</Title>
        <List
          style={{
            padding: "16px",
            // boxShadow: boxShadow,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item key={index}>
              <List.Item.Meta
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </section>
    </>
  );
};
