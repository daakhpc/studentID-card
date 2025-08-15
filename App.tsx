import React, { useState, useRef, useCallback, useEffect } from 'react';
import { IdCard } from './components/IdCard';
import { IdCardForm } from './components/IdCardForm';
import type { StudentData } from './types';

// Declare html2canvas and QRCode on the window object for TypeScript
declare global {
    interface Window {
        html2canvas: any;
        QRCode: any;
    }
}

function App(): React.ReactNode {
    const [studentData, setStudentData] = useState<StudentData>({
        name: 'Jane Doe',
        idNumber: '12345678',
        course: 'Computer Science',
        photoUrl: null,
        validUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 4)).toISOString().split('T')[0],
    });

    const idCardRef = useRef<HTMLDivElement>(null);
    const qrCodeRef = useRef<HTMLDivElement>(null);

    const updateStudentData = (field: keyof StudentData, value: string) => {
        setStudentData(prev => ({ ...prev, [field]: value }));
    };

    const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const photoUrl = URL.createObjectURL(file);
            updateStudentData('photoUrl', photoUrl);
        }
    };

    useEffect(() => {
        if (qrCodeRef.current) {
            qrCodeRef.current.innerHTML = '';
            if (studentData.idNumber) {
                new window.QRCode(qrCodeRef.current, {
                    text: studentData.idNumber,
                    width: 80,
                    height: 80,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                    correctLevel: window.QRCode.CorrectLevel.H
                });
            }
        }
    }, [studentData.idNumber]);

    const handleDownloadImage = useCallback(async () => {
        const element = idCardRef.current;
        if (!element) return;

        try {
            const canvas = await window.html2canvas(element, {
                scale: 3, // Higher scale for better resolution
                backgroundColor: null, // Use transparent background
                useCORS: true,
            });
            const data = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = data;
            link.download = `student-id-${studentData.idNumber || 'card'}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error generating image:', error);
        }
    }, [studentData.idNumber]);

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8 font-sans">
            <div className="container mx-auto">
                <header className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
                        Student ID Card Generator
                    </h1>
                    <p className="text-gray-400 mt-2">Create a professional student ID in seconds.</p>
                </header>

                <main className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                    <div className="lg:col-span-2">
                        <IdCardForm
                            studentData={studentData}
                            onUpdate={updateStudentData}
                            onPhotoUpload={handlePhotoUpload}
                            onDownload={handleDownloadImage}
                        />
                    </div>
                    <div className="lg:col-span-3 flex items-center justify-center">
                        <IdCard
                            ref={idCardRef}
                            qrCodeRef={qrCodeRef}
                            studentData={studentData}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default App;
