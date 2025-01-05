import React from "react";
import { Card, Input, InputNumber, Row, Col, Typography } from "antd";

const { Text } = Typography;

interface PercentageCardProps {
  label: string;
  icon: React.ReactNode;
  percentage: number;
  //   onPercentageChange: (value: number | null) => void;
}

const PercentageCard: React.FC<PercentageCardProps> = ({
  label,
  icon,
  percentage,
  //   onPercentageChange,
}) => {
  return (
    <Card
      style={{ borderRadius: "8px", background: "#1F1F1F", color: "#FFFFFF" }}
    >
      <Row align="middle" justify="space-between">
        <Col>
          <Row align="middle" gutter={16}>
            <Col>{icon}</Col>
            <Col>
              <Text style={{ color: "#FFFFFF", fontSize: "16px" }}>
                {label}
              </Text>
            </Col>
          </Row>
        </Col>
        <Col>
          <InputNumber
            min={0}
            max={100}
            value={percentage}
            // onChange={onPercentageChange}
            formatter={(value) => `${value}%`}
            parser={(value) => Number(value?.replace("%", "") || 0)}
            style={{ width: "80px" }}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default PercentageCard;
