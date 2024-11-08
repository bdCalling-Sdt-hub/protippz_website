'use client';
import React, { useState } from 'react';
import { Button, Input, Checkbox, Typography, Form } from 'antd';
import Image from 'next/image';
import logo from '@/Assets/logo.png';
import logo_bg from '@/Assets/logo_bg.png';
import { useRouter } from 'next/navigation';
const { Title, Text } = Typography;

const OtpPage: React.FC = () => {
    const router = useRouter()
    const [formValues, setFormValues] = useState({
        otp: '',

    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };

    const onFinish = (values: any) => {
        router.push('/reset-password')
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div
            className="w-full min-h-screen flex justify-center items-center"
            style={{
                backgroundImage: `url(${logo_bg.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="flex flex-col items-center p-8 rounded-lg max-w-lg w-full bg-white shadow-lg">
                <Image src={logo} alt="logo" height={100} width={200} />

                <Title level={3} className="text-center text-[#053697] text-3xl mt-4">
                    Verify Otp
                </Title>

                <Form
                    name="signin"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                    className="w-full"
                >
                    <Form.Item
                        label="Verification Code"
                        name="otp"
                        className='text-center flex justify-center items-center'
                        rules={[
                            { required: true, message: 'Please enter your Otp' },
                        ]}
                    >
                        <Input.OTP length={6}
                            className="h-[42px]"
                        />
                    </Form.Item>
                    {/* Uncomment if terms checkbox is needed */}
                    {/* <Form.Item name="terms" valuePropName="checked">
                        <Checkbox onChange={handleCheckboxChange} className="text-[#053697]">
                            I agree to the <Text underline>Terms and Privacy Policy</Text>
                        </Checkbox>
                    </Form.Item> */}

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full bg-[#053697] hover:bg-[#467eee] h-[42px] max-w-[320px] mx-auto block"
                        >
                            Verify Otp
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default OtpPage;
