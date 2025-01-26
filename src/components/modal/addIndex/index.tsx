import React, { ChangeEvent, useEffect, useState } from "react";
import { Flex } from "antd";
import { CloudUploadOutlined, PlusOutlined } from "@ant-design/icons";
import * as anchor from "@coral-xyz/anchor";
import {
  StyledInput,
  StyledModal,
  StyledTextArea,
  StyledUpload,
  Text,
  UploadText,
} from "./styles";
import Button from "../../button";
import CustomSelect from "../../dropdown";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { allocationList } from "../../../constants";
import { createIndex as createIndexToDB } from "../../../services/indexGroup"; // DB Function
import { createIndex as createIndexContract } from "../../../../services/contract"; // On-chain Function
import { useProgram } from "../../../../services/idl"; // Custom hook for Anchor program
import { PublicKey, Keypair, Connection } from "@solana/web3.js";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Select from "../../select";

import { useWallet } from "@solana/wallet-adapter-react";

interface IAddIndexModal {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialIndex = {
  name: "",
  description: "",
  file: "",
  feeAmount: "",
};

const questions = ["Overview", "Maintenance", "Methodology", "Risks", "Fees"];

const AddIndexModal: React.FC<IAddIndexModal> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const { publicKey, signTransaction } = useWallet(); // Wallet context
  const { program, connection } = useProgram() || {}; // Use the custom hook
  const handleCancel = () => setIsModalOpen(false);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [faq, setFaq] = useState(
    questions.map((question) => ({ question, answer: "" }))
  );
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [addIndex, setAddIndex] = useState(initialIndex);
  const [options, setOptions] = useState<Option[]>(allocationList);
  const [selectedOptionTags, setSelectedOptionTags] = useState<string[] | []>(
    []
  );
  const [optionTags, setOptionTags] = useState<WalletOption[] | []>([]);
  const keypair = Keypair.generate(); // Generate mint keypair
  const [mintKeypair] = useState(keypair);

  useEffect(() => {
    const isFormValid =
      addIndex.name.trim() !== "" &&
      addIndex.description.trim() !== "" &&
      faq.every((item) => item.answer.trim() !== "") &&
      selectedOptions.length > 0 &&
      addIndex.file &&
      !(addIndex.file as any)?.status &&
      typeof addIndex.file !== "undefined";

    setIsButtonDisabled(!isFormValid);
  }, [addIndex, faq]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAddIndex((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFaqChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;

    // Update the specific answer in the array
    setFaq((prev) => {
      const updatedValues = [...prev];
      updatedValues[index].answer = value;
      return updatedValues;
    });
  };

  const handleSubmit = async () => {
    if (!program || !connection || !publicKey || !signTransaction) {
      console.warn(
        "Program, connection, wallet, or signTransaction not ready."
      );
      return;
    }

    // Filter selected tokens and prepare data
    const selectedTokens = options.filter((item) =>
      selectedOptions.includes(item.value)
    );
    const tokenData = selectedTokens.map((item) => ({
      coinName: item.label, // For DB
      address: item.value, // For DB
      proportion: item.proportion, // For both DB and on-chain
      mint: new PublicKey(item.value), // For on-chain
      weight: item.proportion, // For on-chain
    }));

    const coins = tokenData.map(({ coinName, address, proportion }) => ({
      coinName,
      address,
      proportion,
    })); // For DB
    const tokenAllocations = tokenData.map(({ mint, weight }) => ({
      mint,
      weight: new anchor.BN(weight), // Convert to BN for on-chain
    })); // For on-chain

    const totalWeight = tokenAllocations.reduce(
      (sum, allocation) => sum + allocation.weight.toNumber(),
      0
    );
    if (totalWeight !== 100) {
      throw new Error("The total allocation percentage must sum up to 100%.");
    }

    const collectorDetails = optionTags.map((item) => ({
      collector: new PublicKey(item.collector),
      weight: new anchor.BN(item.weight),
    }));
    const collectorDetailApi = optionTags.map((item)=>({
      collector: item.collector,
      weight: item.weight,
    }))

    console.log("Submitting index...");

    try {
      const txHash = await createIndexContract(
        program,
        connection,
        publicKey,
        mintKeypair,
        addIndex.name,
        addIndex.description,
        tokenAllocations,
        collectorDetails,
        parseFloat(addIndex.feeAmount),
        signTransaction
      );

      // console.log("Transaction Hash:", txHash);

      console.log(addIndex.feeAmount, "feeAmount")
      const mintPublickey = mintKeypair.publicKey;
      const mintKeySecret = mintKeypair.secretKey;
      await createIndexToDB({
        ...addIndex,
        coins,
        faq,
        mintPublickey,
        mintKeySecret,
        tokenAllocations,
        collectorDetailApi,
      });

      // Clear the form and close the modal
      setAddIndex(initialIndex);
      setFileList([]);
      setSelectedOptions([]);
      setFaq(questions.map((question) => ({ question, answer: "" })));
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting index:", error);
    }
  };

  const handleFileRemove = (file: UploadFile) => {
    console.log("Removing file:", file);
    setAddIndex((prev) => ({ ...prev, file: "" }));
    setFileList([]);
  };

  const handleFile = (info: UploadChangeParam<UploadFile>) => {
    setFileList(info.fileList);
    setAddIndex((prev) => ({ ...prev, file: info?.file as any }));

    if (info.file.status === "done") {
      console.log("File uploaded successfully:", info.file.originFileObj);
    } else if (info.file.status === "error") {
      console.error("File upload failed:", info.file);
    }
  };

  console.log(addIndex, optionTags);
  const isUploaded = fileList.length > 0;

  return (
    <div>
      <StyledModal
        open={isModalOpen}
        onCancel={handleCancel}
        title={
          <Flex justify="space-between" align="center">
            <Text>Add Index</Text>
            <Button
              disabled={isButtonDisabled}
              text="Add Index"
              icon={<PlusOutlined size={20} />}
              onClick={handleSubmit}
            />
          </Flex>
        }
        closable={false}
        centered={true}
        maskStyle={{
          backdropFilter: "blur(15px)",
          background: "#1C1C1C1A",
        }}
      >
        <StyledUpload
          isUploaded={isUploaded}
          fileList={fileList}
          listType="picture"
          multiple={false}
          beforeUpload={() => false}
          onChange={handleFile}
          onRemove={handleFileRemove}
        >
          <Flex gap={10} justify="center" align="center">
            <CloudUploadOutlined style={{ fontSize: "24px", color: "#fff" }} />{" "}
            <UploadText>Upload Image</UploadText>
          </Flex>
        </StyledUpload>

        <StyledInput
          placeholder="Coin Name"
          value={addIndex.name}
          showCount
          maxLength={20}
          name="name"
          onChange={handleChange}
        />

        <StyledTextArea
          style={{ resize: "none" }}
          value={addIndex.description}
          showCount
          rows={4}
          maxLength={200}
          placeholder="Description"
          name="description"
          onChange={handleChange}
        />

        <CustomSelect
          setSelectedOptions={setSelectedOptions}
          selectedOptions={selectedOptions}
          setOptions={setOptions}
          options={options}
        />

        <Select
          setSelectedOptions={setSelectedOptionTags}
          selectedOptions={selectedOptionTags}
          setOptions={setOptionTags}
          options={optionTags}
        />

        {faq.map((item, index) => (
          <StyledInput
            key={index}
            placeholder={item.question}
            value={item.answer}
            showCount
            maxLength={20}
            name={item.question}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleFaqChange(e, index)
            }
          />
        ))}

        <StyledInput
          placeholder="Fees Amount"
          type={"number"}
          value={addIndex.feeAmount}
          showCount
          maxLength={20}
          name="feeAmount"
          onChange={handleChange}
        />
      </StyledModal>
    </div>
  );
};

export default AddIndexModal;
