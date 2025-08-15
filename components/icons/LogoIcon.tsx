import React from 'react';

export const LogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 8.5L5.67 8l6.33-3.18L18.33 8 12 11.5z"/>
        <path d="M3 13.09V17h18v-3.91l-9 4.91-9-4.91z"/>
    </svg>
);