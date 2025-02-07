import { Avatar, Flex, UploadFile } from "antd";
import { StyledModal, StyledTitle, Text } from "../addIndex/styles";
import { LeftOutlined } from "@ant-design/icons";
import Button from "../../button";
import PercentageCard from "./percentageCard";
import { useEffect, useState } from "react";
import { updateIndex } from "../../../services/indexGroup";
import { allocationList } from "../../../constants";

interface IRebalanceModal {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editIndex: IGroupCoin
  handleCoinChange: (value: number, position: number) => void
  faq: IFaq[] | []
  collectorDetail: WalletOption[] | []
}
const RebalanceIndex: React.FC<IRebalanceModal> = ({
  isModalOpen,
  setIsModalOpen,
  editIndex,
  handleCoinChange,
  faq,
  collectorDetail
}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  console.log("collectorDetail", collectorDetail)
  useEffect(() => {
    let totalProportion = (editIndex.coins as ICoin[] || []).reduce((sum: number, coin: ICoin) => sum + coin.proportion, 0);
   // @ts-ignore
    const isFormValid =
      editIndex.name.trim() !== "" &&
      editIndex.description.trim() !== "" &&
      faq.every((item) => item.answer.trim() !== "") &&
      (collectorDetail.length > 0 && collectorDetail.every((item) => item.weight.toString().trim() !== "")) &&
      totalProportion === 100 &&
      ((editIndex.file && !(editIndex.file as any)?.status && typeof editIndex.file !== 'undefined') || editIndex.imageUrl !== "")

    setIsButtonDisabled(!isFormValid);
  }, [editIndex, faq, collectorDetail]);

  const handleSubmit = async () => {
    await updateIndex({ ...editIndex, faq, collectorDetail }).then(() => { window.location.reload() })

  }
  return (
    <div>
      <StyledModal
        open={isModalOpen}
        // onCancel={handleCancel}
        title={
          <Flex justify="space-between" align="center">
            <Flex align="center" gap={4}>
              <StyledTitle
                onClick={() => setIsModalOpen(false)}
              >
                <LeftOutlined />
              </StyledTitle>
              <Text>Allocations</Text>
            </Flex>
            <Button disabled={isButtonDisabled} onClick={handleSubmit} text="Save changes" />
          </Flex>
        }
        closable={false}
        centered={true}
        maskStyle={{
          backdropFilter: "blur(15px)",
          background: "#1C1C1C1A",
        }}
      >
        <Flex style={{ flexDirection: 'column', paddingTop: 16 }} gap={16}>
          {
            editIndex && editIndex?.coins?.length > 0 && editIndex?.coins?.map((item: ICoin, index: number) => (
              <PercentageCard
                label={item.coinName}
                icon={
                  <Avatar size={57} src={allocationList.find((list) => list.label === item.coinName)?.icon} />
                }
                percentage={item.proportion}
                handleCoinChange={handleCoinChange}
                position={index}
              />
            ))
          }
        </Flex>
      </StyledModal>
    </div >
  );
};

export default RebalanceIndex;
