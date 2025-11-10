import { Row, Col, Card, Typography, Flex, theme } from "antd";
import { BookOutlined, TeamOutlined, LinkOutlined } from "@ant-design/icons";
import { StatsCard } from "../../components";
import { useGetDashboardInfoQuery } from "../../state/api";

const { Title, Text } = Typography;

export const Dashboard = () => {
  const {
    token: { colorSuccess, colorPrimary, colorError },
  } = theme.useToken();

  const { data: initialValueDashboard, isSuccess } = useGetDashboardInfoQuery(
    {}
  );

  if (isSuccess) {
    return (
      <>
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          <Col span={24} md={12} key={1}>
            <StatsCard
              status={"Course"}
              role={""}
              value={initialValueDashboard.totalCourses}
              icon={<BookOutlined style={{ color: colorSuccess }} />}
            />
          </Col>
          <Col span={24} md={12} key={2}>
            <StatsCard
              status={"References"}
              role={""}
              value={initialValueDashboard.totalReferences}
              icon={<LinkOutlined style={{ color: colorPrimary }} />}
            />
          </Col>
        </Row>

        <Card>
          <Flex gap={"middle"}>
            <TeamOutlined style={{ fontSize: 36, color: colorError }} />
            <span>
              <Title level={5} style={{ margin: 0 }}>
                Total Users
              </Title>
              <Text>{initialValueDashboard.totalUsers}</Text>
            </span>
          </Flex>
        </Card>
      </>
    );
  }
};
