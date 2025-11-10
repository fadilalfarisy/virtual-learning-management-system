import React from "react";
import { Flex, Typography, Card } from "antd";

const { Title, Text } = Typography;

type Props = {
  role: string;
  status: string;
  value: number;
  icon: React.ReactNode;
};

export const StatsCard = ({ status, role, value, icon }: Props) => {
  return (
    <Card>
      <Flex gap={"middle"}>
        <span style={{ fontSize: 42 }}>{icon}</span>
        <Flex vertical>
          <div>
            <Title level={5} style={{ margin: 0 }}>
              {status}
            </Title>
            <Text type="secondary" style={{ margin: 0 }}>
              {role}
            </Text>
          </div>
          <Title level={2} style={{ margin: 0 }}>
            {value}
          </Title>
        </Flex>
      </Flex>
    </Card>
  );
};
