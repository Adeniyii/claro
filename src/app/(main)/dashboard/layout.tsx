import React from 'react';

interface LayoutProps {
    children: React.ReactNode
    params: any
}
const DashboardLayout: React.FC<LayoutProps> = ({children, params}) => {
    return (
        <main className="">
            {children}
        </main>
    );
};

export default DashboardLayout;