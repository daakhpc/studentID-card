import React, { forwardRef } from 'react';
import type { StudentData } from '../types';
import { LogoIcon } from './icons/LogoIcon';
import { UserIcon } from './icons/UserIcon';

interface IdCardProps {
    studentData: StudentData;
    qrCodeRef: React.RefObject<HTMLDivElement>;
}

export const IdCard = forwardRef<HTMLDivElement, IdCardProps>(({ studentData, qrCodeRef }, ref) => {
    const { name, idNumber, course, photoUrl, validUntil } = studentData;

    const formattedDate = validUntil ? new Date(validUntil).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }) : 'N/A';

    return (
        <div ref={ref} className="w-[320px] h-[512px] bg-gray-800 rounded-2xl shadow-2xl shadow-blue-500/20 flex flex-col overflow-hidden transform transition-transform duration-300 hover:scale-105 font-mono">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-4 flex items-center space-x-3">
                <LogoIcon className="w-10 h-10 text-white" />
                <div>
                    <h2 className="font-bold text-white text-lg tracking-wider">ACADEMY OF INNOVATION</h2>
                    <p className="text-blue-200 text-xs">STUDENT IDENTIFICATION</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-5 flex-grow">
                <div className="flex justify-center mb-4">
                    <div className="w-32 h-36 rounded-lg overflow-hidden border-4 border-gray-700 shadow-md">
                        {photoUrl ? (
                            <img src={photoUrl} alt="Student" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                                <UserIcon className="w-16 h-16 text-gray-500" />
                            </div>
                        )}
                    </div>
                </div>

                <div className="text-center mb-5">
                    <h3 className="text-2xl font-bold text-white tracking-wide">{name || 'STUDENT NAME'}</h3>
                    <p className="text-blue-400 font-medium">{idNumber || 'ID: 00000000'}</p>
                </div>
                
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-400">Course:</span>
                        <span className="text-gray-200 font-semibold">{course || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-400">Valid Until:</span>
                        <span className="text-gray-200 font-semibold">{formattedDate}</span>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-900/50 p-3 mt-auto flex items-center justify-between">
                <div className="w-2/3">
                    <p className="text-xs text-gray-500 italic">This card is the property of the Academy of Innovation and must be returned upon request.</p>
                </div>
                <div ref={qrCodeRef} className="w-20 h-20 bg-white p-1 rounded-md flex items-center justify-center">
                   {/* QR Code will be rendered here by qrcode.js */}
                </div>
            </div>
        </div>
    );
});
