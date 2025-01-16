'use client'
import React, { useEffect, useState } from 'react';
import { Table, Typography, Avatar } from 'antd';
import { get, imageUrl } from '@/ApisRequests/server';

interface Player {
    key: string;
    date: string;
    player: { name: string; avatar: string };
    amount: string;
    points: number;
}

const { Title } = Typography;

interface TipHistoryInterface {
    "_id": string;
    "user": {
        "_id": string;
        "name": string;
        "email": string;
        "profile_image": string;
    };
    "entityId": string;
    "entityType": string;
    "point": number;
    "amount": number;
    "paymentStatus": string;
    "tipBy": string;
    "entity": {
        "name": string;
        "position": string;
        "player_image": string;
    },
    "createdAt": string
}
interface Pagination {
    "page": number,
    "limit": number,
    "total": number,
    "totalPage": number
}
const TippzHistoryPage = () => {
    const [tipHistory, setTipHistory] = useState<TipHistoryInterface[]>([]);
    const [pagination, setPagination] = useState<Pagination>();
    const [page, setPage] = useState(1)
    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (_: any, record: TipHistoryInterface) => <span>{record?.createdAt?.split('T')?.[0]}</span>
        },
        {
            title: 'Team/Player',
            dataIndex: 'player',
            key: 'player',
            render: (_: any, record: TipHistoryInterface) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src={imageUrl(record?.entity?.player_image)} alt={record?.entity?.name} style={{ marginRight: 8 }} />
                    <span>{record?.entity?.name}</span>
                </div>
            ),
        },
        {
            title: 'Tippz Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount: number) => <span>${amount}</span>
        },
        {
            title: 'Points',
            dataIndex: 'point',
            key: 'point',
        },
    ];

    useEffect(() => {
        const getMyTip = async () => {
            const res = await get(`/tip/my-tips?page=${page}`, {
                headers: {
                    'Authorization': `${typeof localStorage === 'undefined' ? '' : localStorage.getItem('token')}`,
                },
            });
            setTipHistory(res.data?.result);
            setPagination(res.data?.meta);
        };
        getMyTip();
    }, []);

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <Title level={2} style={{ color: '#1A73E8' }}>Tippz History</Title>
            <Table
                columns={columns}
                dataSource={tipHistory}
                pagination={{
                    pageSize: pagination?.limit,
                    total: pagination?.total,
                    onChange: (page) => setPage(page)
                }}
                bordered
                style={{ maxWidth: '800px', margin: 'auto', marginTop: '20px' }}
                rowClassName={(record, index) => (index % 2 === 0 ? 'even-row' : 'odd-row')}
            />
        </div>
    );
};

export default TippzHistoryPage;
