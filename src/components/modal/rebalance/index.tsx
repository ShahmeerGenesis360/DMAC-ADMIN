import { Avatar, Flex, UploadFile } from "antd";
import { StyledModal, StyledTitle, Text } from "../addIndex/styles";
import { LeftOutlined } from "@ant-design/icons";
import Button from "../../button";
import PercentageCard from "./percentageCard";
import { useEffect, useState } from "react";
import { updateIndex } from "../../../services/indexGroup";
import { allocationList } from "../../../constants";
import { uploadImageToPinata, uploadMetadataToPinata } from "../../../../services/pinata";
import { toast } from "react-toastify";

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
    console.log(editIndex, "editIndex")
    let totalProportion = (editIndex.coins as ICoin[] || []).reduce((sum: number, coin: ICoin) => sum + coin.proportion, 0);
    // @ts-ignore
    const isFormValid =
      editIndex.symbol !== "" &&
      editIndex.category !== "" &&
      editIndex.name.trim() !== "" &&
      editIndex.description.trim() !== "" &&
      faq.every((item: any) => item.answer.trim() !== "") &&
      (collectorDetail.length > 0 && collectorDetail.every((item: any) => item.weight.toString().trim() !== "")) &&
      totalProportion === 100 &&
      ((editIndex.file && !(editIndex.file as any)?.status && typeof editIndex.file !== 'undefined') || editIndex.imageUrl !== "")

    setIsButtonDisabled(!isFormValid);
  }, [editIndex, faq, collectorDetail]);

  const handleSubmit = async () => {
    if (editIndex.file) {
      console.error("❌ No file selected for upload!");
      const imageUri = await uploadImageToPinata(editIndex.file);
      // ✅ Upload Metadata to Pinata
      const metadataUri = await uploadMetadataToPinata(imageUri, editIndex.name, editIndex.description);
      const response = await fetch(metadataUri)
      const data = await response.json()
      await updateIndex({ ...editIndex, faq, collectorDetail, imageUrl: data.image }).then(() => { 
        toast.success("Index Updated Sucessful!");
        window.location.reload() 
      })
        .catch(() => {
          toast.error("Getting Error!!")
        })

    }
    else {
      await updateIndex({ ...editIndex, faq, collectorDetail }).then(() => { 
        toast.success("Index Updated Sucessful!");
        window.location.reload() 
      })
        .catch(() => {
          toast.error("Getting Error!!")
        })
    }

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
