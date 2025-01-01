import React, { useState } from 'react';
import { Flex, Space } from 'antd';
import styled from 'styled-components';
import MonkeyIcon from '../../assets/monkey.svg';
import { ImageBox, TextField, Table, Pagination, Button } from '../../components';
import { MoreOutlined, PlusOutlined } from '@ant-design/icons';
import { Container, Header, SearchContainer, SubHeader, SubTitle, Title, TotalIndex } from './styles';



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

    return (
        <Container>
            <Flex justify="space-between">
                <Header>Dashboard</Header>
                <Button text='Add Index' icon={<PlusOutlined size={20} />} />
            </Flex>
            <SubHeader>Here’s your analytics details:</SubHeader>
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
        </Container>
    );
};

export default Dashboard;
