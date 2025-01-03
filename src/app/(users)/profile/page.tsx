'use client'
import { imageUrl } from '@/ApisRequests/server';
import { useContextData } from '@/provider/ContextProvider';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ProfilePage = () => {
    const data = useContextData()
    return (
        <div className="container mx-auto p-8 text-center">
            <h1 className="text-4xl font-bold text-blue-700 mb-8">Profile</h1>

            <div className="flex flex-col items-center">
                <Image
                    width={100}
                    height={100}
                    unoptimized
                    src={imageUrl(data?.userData?.profile_image || '') || "https://i.ibb.co.com/f4tzYw2/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover mb-4"
                />

                <h2 className="text-2xl font-semibold text-blue-700">{data?.userData?.name}</h2>
                <p className="text-green-600 mb-8">{data?.userData?.email}</p>

                <div className="text-left space-y-4">
                    <div className="flex justify-between">
                        <p className="font-semibold text-blue-700">User Name:</p>
                        <p className="text-green-600">{data?.userData?.username}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-semibold text-blue-700">Phone Number:</p>
                        <p className="text-green-600">{data?.userData?.phone}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-semibold text-blue-700">Address:</p>
                        <p className="text-green-600">{data?.userData?.address}</p>
                    </div>
                </div>

                <Link href={`/profile/${data?.userData?._id}`} className="mt-8 bg-blue-700 text-white font-semibold py-2 px-8 rounded-md hover:bg-blue-800 transition">
                    Edit
                </Link>
            </div>
        </div>
    );
};

export default ProfilePage;
