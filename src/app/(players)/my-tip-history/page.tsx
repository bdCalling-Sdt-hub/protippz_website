'use client';
import React, { useEffect, useState } from 'react';
import { Table, Typography, Avatar } from 'antd';
import { get, imageUrl } from '@/ApisRequests/server';
import BackButton from '@/components/ui/BackButton';

interface Player {
  key: string;
  date: string;
  player: { name: string; avatar: string };
  amount: string;
  points: number;
}

const { Title } = Typography;

interface TipHistoryInterface {
  _id: string;
  user: {
    _id: string;
    name: string;
    user: string;
    email: string;
    profile_image: string;
  };
  entityId: string;
  entityType: string;
  point: number;
  amount: number;
  paymentStatus: string;
  tipBy: string;
  entity: {
    name: string;
    position: string;
    player_image: string;
  };
  createdAt: string;
}
interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}
const TippzHistoryPage = () => {
  const [tipHistory, setTipHistory] = useState<TipHistoryInterface[]>([]);
  const [pagination, setPagination] = useState<Pagination>();
  const [page, setPage] = useState(1);
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (_: any, record: TipHistoryInterface) => (
        <span>
          {new Date(record?.createdAt).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
      ),
    },
    {
      title: "Fan's Name",
      dataIndex: 'user',
      key: 'user',
      render: (_: any, record: TipHistoryInterface) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            src={imageUrl(
              record?.user?.user ||
                'https://i.ibb.co.com/PsxKbMWH/defult-Image.jpg'
            )}
            alt={record?.user?.profile_image}
            style={{ marginRight: 8 }}
          />
          <span className="text-black">{record?.user?.name}</span>
        </div>
      ),
    },
    {
      title: 'Tippz Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => <span>${amount}</span>,
    },
    // {
    //   title: "Points",
    //   dataIndex: "point",
    //   key: "point",
    // },
  ];

  useEffect(() => {
    const getMyTip = async () => {
      const res = await get(`/tip/my-tips?page=${page}`, {
        headers: {
          Authorization: `${
            typeof localStorage === 'undefined'
              ? ''
              : localStorage.getItem('token')
          }`,
        },
      });
      setTipHistory(res.data?.result);
      setPagination(res.data?.meta);
    };
    getMyTip();
  }, []);

  return (
    <div className="w-full max-w-screen-2xl">
      <BackButton />
      <Title level={2} style={{ color: '#1A73E8' }}>
        Tippz History
      </Title>
      <Table
        columns={columns}
        dataSource={tipHistory}
        pagination={{
          pageSize: pagination?.limit,
          total: pagination?.total,
          onChange: (page) => setPage(page),
        }}
        bordered
        style={{ width: '100%', margin: 'auto', marginTop: '20px' }}
        rowClassName={(record, index) =>
          index % 2 === 0 ? 'even-row' : 'odd-row'
        }
      />
    </div>
  );
};

export default TippzHistoryPage;
