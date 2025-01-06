import { Avatar, Flex } from "antd";
import { StyledModal, Text } from "../addIndex/styles";
import { LeftOutlined } from "@ant-design/icons";
import Button from "../../button";
import PercentageCard from "./percentageCard";
import { useState } from "react";

interface IRebalanceModal {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const RebalanceIndex: React.FC<IRebalanceModal> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const [percentage, setPercentage] = useState(30);
  console.log(setPercentage)

  return (
    <div>
      <StyledModal
        open={isModalOpen}
        // onCancel={handleCancel}
        title={
          <Flex justify="space-between" align="center">
            <Flex align="center" gap={4}>
              <span
                style={{
                  height: "32px",
                  width: "32px",
                  background: "#373737",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => setIsModalOpen(false)}
              >
                <LeftOutlined />
              </span>
              <Text>Allocations</Text>
            </Flex>
            <Button text="Save changes" />
          </Flex>
        }
        closable={false}
        centered={true}
        maskStyle={{
          backdropFilter: "blur(15px)",
          background: "#1C1C1C1A",
        }}
      >
        <PercentageCard
          label="Uniswap"
          icon={
            <Avatar src="https://cryptologos.cc/logos/uniswap-uni-logo.png" />
          }
          percentage={percentage}
        />
      </StyledModal>
    </div>
  );
};

export default RebalanceIndex;
