import React from "react";
import { Card, Row, Col } from "antd";
import { CardText, InputNumber } from "../addIndex/styles";


interface PercentageCardProps {
  label: string;
  icon: React.ReactNode;
  percentage: number;
  position: number;
  handleCoinChange: (value: number, position: number) => void
}

const PercentageCard: React.FC<PercentageCardProps> = ({
  label,
  icon,
  percentage,
  handleCoinChange,
  position
}) => {
  return (
    <Card
      style={{ borderRadius: "19px", background: "#FFFFFF0D", color: "#FFFFFF" }}
    >
      <Row align="middle" justify="space-between">
        <Col>
          <Row align="middle" gutter={16}>
            <Col>{icon}</Col>
            <Col>
              <CardText>
                {label}
              </CardText>
            </Col>
          </Row>
        </Col>
        <Col>
          <InputNumber
            type="number"
            placeholder="Enter %"
            defaultValue={0}
            value={percentage}
            name={label}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleCoinChange(Number(e.target.value), position)
            }
          />
        </Col>
      </Row>
    </Card>
  );
};

export default PercentageCard;
