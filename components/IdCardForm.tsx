import React from 'react';
import type { StudentData } from '../types';
import { CameraIcon } from './icons/CameraIcon';
import { DownloadIcon } from './icons/DownloadIcon';

interface IdCardFormProps {
    studentData: StudentData;
    onUpdate: (field: keyof StudentData, value: string) => void;
    onPhotoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onDownload: () => void;
}

const InputField: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder?: string; type?: string }> = ({ label, value, onChange, placeholder, type = "text" }) => (
    <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full bg-gray-700 border border-gray-600 text-white rounded-md p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
        />
    </div>
);


export const IdCardForm: React.FC<IdCardFormProps> = ({ studentData, onUpdate, onPhotoUpload, onDownload }) => {
    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-white">Enter Details</h2>
            <form className="space-y-4">
                <InputField
                    label="Full Name"
                    value={studentData.name}
                    onChange={(e) => onUpdate('name', e.target.value)}
                    placeholder="e.g., Jane Doe"
                />
                <InputField
                    label="ID Number"
                    value={studentData.idNumber}
                    onChange={(e) => onUpdate('idNumber', e.target.value)}
                    placeholder="e.g., 12345678"
                />
                <InputField
                    label="Course / Major"
                    value={studentData.course}
                    onChange={(e) => onUpdate('course', e.target.value)}
                    placeholder="e.g., Computer Science"
                />
                <InputField
                    label="Valid Until"
                    type="date"
                    value={studentData.validUntil}
                    onChange={(e) => onUpdate('validUntil', e.target.value)}
                />

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Student Photo</label>
                    <label htmlFor="photo-upload" className="w-full flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-gray-300 font-semibold py-2 px-4 rounded-md cursor-pointer transition duration-200">
                        <CameraIcon className="w-5 h-5" />
                        <span>Upload Photo</span>
                    </label>
                    <input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={onPhotoUpload} />
                </div>
                
                <button
                    type="button"
                    onClick={onDownload}
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-bold py-3 px-4 rounded-md transition duration-200 transform hover:scale-105"
                >
                    <DownloadIcon className="w-5 h-5" />
                    <span>Download ID Card</span>
                </button>
            </form>
        </div>
    );
};
