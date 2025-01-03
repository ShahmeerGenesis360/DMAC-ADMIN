import React, { useState } from 'react';
import { Flex, Space } from 'antd';
import styled from 'styled-components';
import MonkeyIcon from '../../assets/monkey.svg';
import { ImageBox, TextField, Table, Pagination, Button, LineChart, AddIndexModal } from '../../components';
import { MoreOutlined, PlusOutlined } from '@ant-design/icons';
import { Container, Header, SearchContainer, SubHeader, SubTitle, Title, TotalIndex } from './styles';

import { Card, Typography, Select } from 'antd';

const { Text, Title: AntdTitle } = Typography;
const { Option } = Select;

// Styled Components for Cards
const DashboardContainer = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  width: 100%;
`;

const StyledCard = styled(Card)`
  background: linear-gradient(180deg, #1D1D1D 0%, #282828 100%);;
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


const data = Array.from({ length: 5 }, (_, i) => ({
  key: i,
  index: `Index ${i + 1}`,
  rank: 200 - i * 10,
  price: 'Lorem',
  tvl: 'Lorem',
  holder: 'Lorem',
  address: 'Lorem',
}));

const columns = [
  {
    title: 'Index',
    dataIndex: 'index',
    key: 'index',
    render: (text: string) => (
      <IndexName>
        <ImageBox src={MonkeyIcon} />
        <IndexText>{text}</IndexText>
      </IndexName>
    ),
  },
  {
    title: 'Rank',
    dataIndex: 'rank',
    key: 'rank',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'TVL',
    dataIndex: 'tvl',
    key: 'tvl',
  },
  {
    title: 'Holders',
    dataIndex: 'holder',
    key: 'holder',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    render: (text: string) => (
      <Flex justify="space-between">
        {text}
        <Space size='middle'>
          <MoreOutlined
            style={{ fontSize: '20px', cursor: 'pointer' }}
          />
        </Space>
      </Flex>
    )
  },
];


const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openmodal, setOpenModal] = useState(false);

  return (
    <Container>
      <Flex justify="space-between">
        <Header>Dashboard</Header>
        <Button text='Add Index' icon={<PlusOutlined size={20} />} onClick={() => setOpenModal(true)} />
      </Flex>
      <SubHeader>Here’s your analytics details:</SubHeader>
      <DashboardContainer>
        {/* Card 1: Total Value Locked */}
        <StyledCard>
          <CardHeader>
            <Text>Total Value Locked</Text>
            <Select defaultValue="Monthly" size="small">
              <Option value="monthly">Monthly</Option>
              <Option value="weekly">Weekly</Option>
            </Select>
          </CardHeader>
          <AntdTitle level={4} style={{ color: '#4caf50' }}>
            4,556 <span style={{ fontSize: 12, color: '#7cf97c' }}>+5.2%</span>
          </AntdTitle>
          <LineChart />
        </StyledCard>

        {/* Card 2: Total Users */}
        <StyledCard>
          <CardHeader>
            <Text>Total Users • 20 new users</Text>
            <Select defaultValue="Monthly" size="small">
              <Option value="monthly">Monthly</Option>
              <Option value="weekly">Weekly</Option>
            </Select>
          </CardHeader>
          <AntdTitle level={4} style={{ color: '#fff' }}>
            30,000 users since <span style={{ color: '#4caf50' }}>Jan</span>
          </AntdTitle>
          <LineChart />
        </StyledCard>

        {/* Card 3: Transactions */}
        <StyledCard>
          <CardHeader>
            <Text>Transactions</Text>
            <Select defaultValue="Weekly" size="small">
              <Option value="weekly">Weekly</Option>
              <Option value="daily">Daily</Option>
            </Select>
          </CardHeader>
          <Text>Transactions in past week</Text>
          <LineChart />
        </StyledCard>
      </DashboardContainer>
      <SearchContainer>
        <Title>Indexes</Title>
        <Flex className='ant_flex' align="center" justify="end" gap={15}>
          <Flex gap={10}>
            <SubTitle>Total No Of Index:</SubTitle>
            <TotalIndex>02</TotalIndex>
          </Flex>
          <TextField placeholder='Search coin,Indexes etc' />
        </Flex>
      </SearchContainer>
      <Table
        columns={columns}
        dataSource={data.slice((currentPage - 1) * 10, currentPage * 10)}
      />
      <Pagination
        currentPage={currentPage}
        total={data.length}
        onChange={(page: number) => setCurrentPage(page)}
      />
      <AddIndexModal isModalOpen={openmodal} setIsModalOpen={setOpenModal} />
    </Container>
  );
};

export default Dashboard;