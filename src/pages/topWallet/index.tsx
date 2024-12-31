import React, { useState } from 'react';
import { Flex, Space } from 'antd';
import styled from 'styled-components';
import TokenIcon from '../../assets/token.svg';
import { ImageBox, TextField, Table, Pagination } from '../../components';
import { MoreOutlined } from '@ant-design/icons';
import { Container, Header, SearchContainer, SubHeader, Title } from './styles';



const WalletName = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const WalletText = styled.span`
  font-weight: 400;
`;


const data = Array.from({ length: 30 }, (_, i) => ({
  key: i,
  walletName: `Wallet Name ${i + 1}`,
  rank: 200 - i * 10,
  address: 'Lorem',
  purchasedIndex: 'Lorem',
  totalWorth: 'Lorem',
}));

const columns = [
  {
    title: 'Wallet Name',
    dataIndex: 'walletName',
    key: 'walletName',
    render: (text: string) => (
      <WalletName>
        <ImageBox src={TokenIcon} />
        <WalletText>{text}</WalletText>
      </WalletName>
    ),
  },
  {
    title: 'Rank',
    dataIndex: 'rank',
    key: 'rank',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Purchased Index',
    dataIndex: 'purchasedIndex',
    key: 'purchasedIndex',
  },
  {
    title: 'Total Worth',
    dataIndex: 'totalWorth',
    key: 'totalWorth',
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


const TopWallet = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Container>
      <Header>Top Wallet</Header>
      <SubHeader>Here's Your Wallets Details.</SubHeader>
      <SearchContainer>
        <Title>My Wallet</Title>
        <TextField />
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
    </Container>
  );
};

export default TopWallet;
