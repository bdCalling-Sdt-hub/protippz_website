'use client'
import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { post } from '@/ApisRequests/server';
import toast from 'react-hot-toast';

const { Title } = Typography;

const ChangePasswordPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <Title level={2} className="text-center text-[#053697] text-4xl font-bold mb-8">
                Change Password
            </Title>

            {/* Form */}
            <Form
                layout="vertical"
                className="max-w-md mx-auto"
                onFinish={async (values) => {
                    // console.log('Form Values:', values)
                    const res = await post('/auth/change-password', values, {
                        headers: {
                            'Authorization': `${localStorage.getItem('token')}`
                        }
                    })
                    if (res?.success) {
                        toast.success(res?.message)
                    } else {
                        toast.error(res?.message)
                    }
                }}
            >
                <Form.Item
                    label="Current Password"
                    name="oldPassword"
                    rules={[{ required: true, message: 'Please enter your current password!' }]}
                >
                    <Input.Password
                        className='h-[42px]'
                        placeholder="Enter your current password"
                        style={{ borderColor: '#00c96d' }}
                    />
                </Form.Item>
                <Form.Item
                    label="New Password"
                    name="newPassword"
                    rules={[{ required: true, message: 'Please enter your new password!' }]}
                >
                    <Input.Password
                        className='h-[42px]'
                        placeholder="Enter your new password"
                        style={{ borderColor: '#00c96d' }}
                    />
                </Form.Item>

                {/* Confirm New Password */}
                <Form.Item
                    label="Confirm New Password"
                    name="confirmNewPassword"
                    rules={[
                        { required: true, message: 'Please confirm your new password!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Passwords do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        className='h-[42px]'
                        placeholder="Retype your new password"
                        style={{ borderColor: '#00c96d' }}
                    />
                </Form.Item>

                {/* Save Button */}
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="w-full bg-[#053697] hover:bg-[#032b6d] h-[42px] text-white font-semibold"
                    >
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ChangePasswordPage;
