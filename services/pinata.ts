import axios from "axios";

const PINATA_API_KEY = process.env.VITE_PINATA_API_KEY;
const PINATA_SECRET_KEY = process.env.VITE_PINATA_SECRET_KEY;
const GATEWAY_URL = process.env.VITE_GATEWAY_URL;

export const uploadImageToPinata = async (file: File): Promise<string> => {
  try {
    console.log("🚀 Uploading Image to Pinata:", file.name);

    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        pinata_api_key: PINATA_API_KEY!,
        pinata_secret_api_key: PINATA_SECRET_KEY!,
      },
    });

    const imageUrl = `${GATEWAY_URL}${res.data.IpfsHash}`;
    console.log("✅ Image Uploaded:", imageUrl);
    return imageUrl;
  } catch (error) {
    console.error("❌ Error uploading image to Pinata:", error);
    throw error;
  }
};

export const uploadMetadataToPinata = async (
  imageUri: string,
  indexName: string,
  indexDescription: string
): Promise<string> => {
  try {
    console.log("🚀 Uploading Metadata to Pinata...");

    const metadata = {
      name: indexName,
      description: indexDescription,
      image: imageUri,
      properties: {
        files: [{ type: "image/png", uri: imageUri }],
      },
    };

    const res = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", metadata, {
      headers: {
        pinata_api_key: PINATA_API_KEY!,
        pinata_secret_api_key: PINATA_SECRET_KEY!,
      },
    });

    const metadataUri = `${GATEWAY_URL}${res.data.IpfsHash}`;
    console.log("✅ Metadata Uploaded:", metadataUri);
    return metadataUri;
  } catch (error) {
    console.error("❌ Error uploading metadata to Pinata:", error);
    throw error;
  }
};
