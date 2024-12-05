'use client'
import React, { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import { post } from '@/ApisRequests/server';
import { FiClipboard } from 'react-icons/fi';
import toast from 'react-hot-toast';

const InviteFriendsPage: React.FC = () => {
    const [inviteLink, setInviteLink] = useState('')
    const [openModal, setOpenModal] = useState(false)
    const inviteHandler = async () => {
        const res = await post('/invite/invite-friend', {}, {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
            }
        })
        if (res?.success) {
            setInviteLink(res?.data?.link)
            setOpenModal(true)
        } else {
            toast.error(res?.message)
        }
    }
    const handleCopy = () => {
        navigator.clipboard.writeText(inviteLink)
            .then(() => {
                toast.success('The invite link has been copied to your clipboard.');
            })
            .catch(() => {
                toast.error('There was an error copying the invite link.');
            });
    };
    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-center text-[#053697] text-4xl font-bold mb-2">
                Invite Friends
            </h2>
            <p className="text-center text-green-500 mb-8">
                Bring Friends, Earn Rewards!
            </p>

            <div className="mb-12">
                <h3 className="text-[#333] text-2xl font-semibold">
                    Introduction
                </h3>
                <p className="text-gray-700">
                    At PROTIPPZ, we believe sports are better with friends. Now you can share the fun of Tippzing, earn rewards together, and celebrate every win as a team. Invite your friends to join PROTIPPZ and unlock exclusive bonuses for each friend who signs up!
                </p>
            </div>
            <div className="mb-12">
                <h3 className="text-[#333] text-2xl font-semibold">
                    How It Works
                </h3>
                <div className="mb-4">
                    <p className="font-bold">1. Invite</p>
                    <p className="text-gray-700 ml-4">
                        Use the “Invite Friends” button below to share your unique referral link via text, email, or social media.
                    </p>
                </div>
                <div className="mb-4">
                    <p className="font-bold">2. Sign Up</p>
                    <p className="text-gray-700 ml-4">
                        When your friends sign up using your link, they’ll join the PROTIPPZ community where they can Tippz, win rewards, and participate in exclusive fan events.
                    </p>
                </div>
                <div className="mb-4">
                    <p className="font-bold">3. Earn Rewards</p>
                    <p className="text-gray-700 ml-4">
                        For each friend who joins, you’ll earn 100 points/credits that you can redeem for special rewards, exclusive gear, or event tickets.
                    </p>
                </div>
            </div>
            <div className="text-center mb-12">
                <h3 className="text-[#333] text-2xl font-semibold">
                    Ready to Get Started?
                </h3>
                <p className="font-semibold mb-2">Invite Friends Now</p>
                <p className="text-gray-700 mb-6">
                    Click below to start inviting friends and watch your rewards grow!
                </p>
                <Button onClick={inviteHandler} type="primary" className="bg-green-500 h-[42px] text-white font-semibold px-8 py-2 rounded-md">
                    Invite Friends
                </Button>
            </div>
            <Modal
                centered
                footer={false}
                open={openModal}
                onCancel={() => setOpenModal(false)}
                width={500}
            >
                <div className="flex flex-col items-center">
                    <h3 className="text-2xl font-semibold text-green-600 mb-6 text-center">
                        Invite Link Created Successfully!
                    </h3>
                    <div className="flex items-center w-full">
                        <p className='text-center w-full'>{inviteLink}</p>
                        <button
                            onClick={handleCopy}>
                            <FiClipboard
                                size={24}
                                className="ml-2 cursor-pointer text-green-600 hover:text-green-700 transition-all duration-300 ease-in-out"
                            />
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default InviteFriendsPage;
