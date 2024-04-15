import Header from "@/components/header";
import React from "react";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="h-screen">
            <Header />
            {children}
        </main>

    );
}
