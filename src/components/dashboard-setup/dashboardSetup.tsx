"use client";

import React from 'react';
import {AuthUser} from "@supabase/supabase-js";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

interface  DashboardSetupProps {
    user: AuthUser;
    subscription: any;
}

const DashboardSetup: React.FC<DashboardSetupProps> = ({user, subscription}) => {
    return (
        <Card className="w-[800px] h-screen sm:h-auto">
            <CardHeader>
                <CardTitle>Create a workspace!</CardTitle>
                <CardDescription>
                    <p>It looks like you don&apos;t have a workspace yet.</p>
                    <p>Let&apos;s create one!</p>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={() => {}} className="flex flex-col gap-4">
                   <div className="flex items-center gap-4">
                       <div>
                           emoji picker
                       </div>
                   </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default DashboardSetup;