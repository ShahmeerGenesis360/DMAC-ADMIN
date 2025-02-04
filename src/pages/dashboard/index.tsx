import React, { useEffect, useState } from "react";
import { Dropdown, Flex, MenuProps, Space } from "antd";
import styled from "styled-components";
import MonkeyIcon from "../../assets/monkey.svg";
import {
  ImageBox,
  TextField,
  Table,
  Pagination,
  Button,
  LineChart,
  AddIndexModal,
} from "../../components";
import {
  EditOutlined,
  EyeOutlined,
  MoreOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Container,
  Header,
  SearchContainer,
  StyledMenu,
  StyledSelect,
  SubHeader,
  SubTitle,
  Title,
  TotalIndex,
} from "./styles";

import { Card, Typography, Select } from "antd";
import EditIndexModal from "../../components/modal/editIndex";
import { formatNumber, transactionChart, userCharts, userDataSet } from '../../constants';
import { BarChart } from "../../components/Graph";
import { getAllIndex } from "../../services/indexGroup";
import { buySellChart, feesChart, userChart } from "../../services/charts";
import { socket } from "../../socket";

const { Title: AntdTitle } = Typography;
const { Option } = Select;


interface IProps {
  data: IGroupCoin[] | [];
  message?: string;
  status: boolean;
}

interface ChartData {
  labels: string[];
  datasets: {
    label?: string;
    data: number[] | [];
    fill: boolean;
    tension: number;
    pointBackgroundColor: string;
    pointBorderColor: string;
    pointHoverBorderColor: string;
    pointHoverBackgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}


// Styled Components for Cards
const DashboardContainer = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  padding-bottom: 20px;
`;

const StyledCard = styled(Card)`
  background: linear-gradient(180deg, #1d1d1d 0%, #282828 100%);
  border-radius: 8px;
  color: #fff;
  flex: 1;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IndexName = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const IndexText = styled.span`
  font-weight: 400;
`;

const CardText = styled.span`
  color: #979797;
  font-weight: 600;
  font-size: 16px;
`;

const items = (editIndex: Function, record: object): MenuProps["items"] => [
  {
    key: "1",
    label: "Edit",
    icon: <EditOutlined />,
    onClick: () => editIndex(record),
  },
  { key: "2", label: "View", icon: <EyeOutlined /> },
];

const data = Array.from({ length: 5 }, (_, i) => ({
  key: i,
  index: `Index ${i + 1}`,
  rank: 200 - i * 10,
  price: "Lorem",
  tvl: "Lorem",
  holder: "Lorem",
  address: "Lorem",
}));

// const BASE_URL = import.meta.env.VITE_UPLOAD_URL;
const BASE_URL = process.env.VITE_UPLOAD_URL;

const columns = (editIndex: Function) => [
  {
    title: "Index",
    dataIndex: "name",
    key: "name",
    render: (text: string, record: IGroupCoin) => (
      <IndexName>
        <ImageBox
          height={34}
          width={34}
          style={{ borderRadius: 50 }}
          src={record.imageUrl ? `${BASE_URL}/uploads/${record?.imageUrl}` : MonkeyIcon}
        />
        <IndexText>{text}</IndexText>
      </IndexName>
    ),
  },
  {
    title: "Rank",
    dataIndex: "rank",
    key: "rank",
    render: () => ("Loreum")
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (text: number) => (
      <IndexText>
        {text.toFixed(2)}
      </IndexText>)
  },
  {
    title: "TVL",
    dataIndex: "tvl",
    key: "tvl",
    render: () => ("Loreum")
  },
  {
    title: "Holders",
    dataIndex: "holder",
    key: "holder",
    render: (_: any, record: any) => (
      <IndexText>
        {record?.totalBuy && formatNumber(record?.totalBuy - record?.totalSell)}
      </IndexText>)
  },
  {
    title: "Address",
    dataIndex: "_id",
    key: "_id",
    render: (text: string, record: object) => {
      return (
        <Flex justify="space-between">
          {text}
          <Space size="middle">
            <Dropdown
              menu={{ items: items(editIndex, record) }}
              overlayClassName="custom-dropdown"
            >
              <MoreOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
            </Dropdown>
            <StyledMenu />
          </Space>
        </Flex>
      );
    },
  },
];

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openmodal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState({});
  const [indexes, setIndexes] = useState<IGroupCoin[] | []>([]);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [transactionData, setTransactionData] = useState<any | null>(null);
  const [feesData, setFeesData] = useState<any | null>(null);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [usersInfo, setUsersInfo] = useState<any>(null)

  const editIndex = async (index: object) => {
    setCurrentIndex(index);
    setOpenEditModal(true);
  };

  useEffect(() => {
    getAllIndex().then((res: IProps) => {
      setIndexes(res.data)
    })
  }, [])

  useEffect(() => {
    // Socket listener for incoming data
    const handleSocketData = ({ info }: any) => {
      console.log("info", info)
      setIndexes((prevIndexes) => {
        const updatedIndexes = prevIndexes.map((index) =>
          index._id === info.id ? { ...index, ...info } : index
        );
        return updatedIndexes;
      });
    };
    // Listen for updates for each index
    indexes.forEach((item) => {
      console.log("heheheheh", indexes)
      socket.emit("index2", item._id);
      socket.on(`index2:${item._id}`, handleSocketData);
    });

    // Clean up socket listeners
    return () => {
      indexes.forEach((item) => {
        socket.off(`index2:${item._id}`, handleSocketData);
      });
    };
  }, [indexes]);
 


  useEffect(() => {
    const fetchData = async () => {
      const response = await userChart('month');
      const { groupedData, totalUsers, latestMonth, latestMonthCount } = response.data;
      console.log(groupedData, "groupedData")
      // setMonths(Object.keys(groupedData)); // Set available months for selection
      const monthLabels = Object.keys(groupedData);
      const monthTotals = Object.values(groupedData);
      console.log('totalUsers', latestMonth, monthTotals)
      setUsersInfo({ totalUsers, latestMonth, latestMonthCount })
      const formattedLabels = monthLabels.map(label => {
        const [year, month] = label.split("-"); // Split into year and month
        const date = new Date(year, month - 1); // Create a Date object
        return `${date.toLocaleString('en-US', { month: 'short' })} ${year}`; // Format as "Jan 2025"
      });

      setChartData({
        labels: [
          ...formattedLabels,
          `${new Date().toLocaleString('en-US', { month: 'short' })} ${new Date().getFullYear()}`
        ], // Months as labels
        datasets: [
          {
            label: 'Total Users',
            data: [...monthTotals, 0], // Total user counts for each month
            ...userDataSet,
          },
        ],
      });
    };

    fetchData();
    getTransaction();
    getFees();
  }, []);
  // transactionChart

  const getTransaction = async () => {
    const data = await buySellChart('daily');
    const formatData = (transactions: any, key: "totaldeposit" | "totalwithdrawl") => {
      return transactions?.map((txn: any) => ({
        x: new Date(txn.startDate),
        y: txn[key],
      }));
    };

    setTransactionData({
      labels: data?.map((item: any) => item.startDate),
      datasets: [
        {
          label: "Buy",
          data: formatData(data, "totaldeposit"),
          fill: false,
          tension: 0,
          borderColor: "#78DA89",
          pointBackgroundColor: "#78DA89",
        },
        {
          label: "Sell",
          data: formatData(data, "totalwithdrawl"),
          fill: false,
          borderColor: "#E87975",
          pointBackgroundColor: "#E87975",
          tension: 0,
        },
      ],
    });
  }

  const getFees = async () => {
    const data = await feesChart();
    const formatData = (transactions: any, key: "totalAmount") => {
      return transactions?.map((txn: any) => ({
        x: new Date(txn.startDate),
        y: txn[key],
      }));
    };

    setFeesData({
      labels: data?.map((item: any) => item.startDate),
      datasets: [
        {
          label: "Buy",
          data: formatData(data, "totalAmount"),
          backgroundColor: "#78DA89",
          borderRadius: 2,
          barPercentage: 0.4,
          categoryPercentage: 0.4,
          borderColor: "#78DA89",
          pointBackgroundColor: "#78DA89",
        }
      ],
    });
  }
  console.log(chartData, "chartData")


  return (
    <Container>
      <Flex justify="space-between">
        <Header>Dashboard</Header>
        <Button
          text="Add Index"
          icon={<PlusOutlined size={20} />}
          onClick={() => setOpenModal(true)}
        />
      </Flex>
      <SubHeader>Here’s your analytics details:</SubHeader>
      <DashboardContainer>
        {/* Card 1: Total Value Locked */}
        <StyledCard>
          <CardHeader>
            <CardText>Total Value Locked</CardText>
            <StyledSelect defaultValue="Monthly" size="small">
              <Option value="monthly">Monthly</Option>
              <Option value="weekly">Weekly</Option>
            </StyledSelect>
          </CardHeader>
          <AntdTitle level={4} style={{ color: "#4caf50" }}>
            4,556 <span style={{ fontSize: 12, color: "#7cf97c" }}>+5.2%</span>
          </AntdTitle>
          <LineChart data={userCharts || {}} />
        </StyledCard>

        {/* Card 2: Total Users */}
        <StyledCard>
          <CardHeader>
            <CardText>Total Users • {usersInfo?.latestMonthCount || 0} new users</CardText>
            <StyledSelect defaultValue="Monthly" size="small">
              <Option value="monthly">Monthly</Option>
              <Option value="weekly">Weekly</Option>
            </StyledSelect>
          </CardHeader>
          <AntdTitle level={4} style={{ color: "#fff" }}>
            {usersInfo?.totalUsers || 0} users since <span style={{ color: "#4caf50" }}>{usersInfo?.latestMonth || ''}</span>
          </AntdTitle>
          {
            chartData &&
            <LineChart data={chartData || {}} />
          }
        </StyledCard>

        {/* Card 3: Transactions */}
        <StyledCard>
          <CardHeader>
            <CardText>Transactions</CardText>
            <StyledSelect defaultValue="Weekly" size="small">
              <Option value="weekly">Weekly</Option>
              <Option value="daily">Daily</Option>
            </StyledSelect>
          </CardHeader>
          <AntdTitle level={4} style={{ color: '#fff' }}>
            Transactions in past week <span style={{ color: '#4caf50' }}>Jan</span>
          </AntdTitle>
          {
            transactionData &&
            <LineChart legend={true} data={transactionData} />
          }
        </StyledCard>
      </DashboardContainer>

      <StyledCard>
        <CardHeader>
          <CardText>Total Fee Revenue</CardText>
          <StyledSelect defaultValue="Monthly" size="small">
            <Option value="monthly">Monthly</Option>
            <Option value="weekly">Weekly</Option>
          </StyledSelect>
        </CardHeader>
        <AntdTitle level={4} style={{ color: '#4caf50' }}>
          {feesData && Math.floor(feesData?.datasets[0]?.data?.reduce((acc: number, value: any) => acc + value.y, 0))} <span style={{ fontSize: 12, color: '#7cf97c' }}>+5.2%</span>
        </AntdTitle>
        {
          feesData &&
          <BarChart data={feesData || {}} />
        }
      </StyledCard>
      <SearchContainer>
        <Title>Indexes</Title>
        <Flex className="ant_flex" align="center" justify="end" gap={15}>
          <Flex gap={10}>
            <SubTitle>Total No Of Index:</SubTitle>
            <TotalIndex>{indexes.length || 0}</TotalIndex>
          </Flex>
          <TextField placeholder="Search coin,Indexes etc" />
        </Flex>
      </SearchContainer>
      <Table
        columns={columns(editIndex)}
        dataSource={indexes}
      />
      <Pagination
        currentPage={currentPage}
        total={data.length}
        onChange={(page: number) => setCurrentPage(page)}
      />
      <AddIndexModal isModalOpen={openmodal} setIsModalOpen={setOpenModal} />
      <EditIndexModal
        isModalOpen={openEditModal}
        setIsModalOpen={setOpenEditModal}
        index={currentIndex}
      />
    </Container>
  );
};

export default Dashboard;
