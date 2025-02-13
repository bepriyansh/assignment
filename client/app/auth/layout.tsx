"use client";
import React from "react";
import { Tabs, Tab, Card, CardBody } from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const selectedTab = pathname.split("/").pop();

  return (
    <div className="flex flex-col w-full items-center justify-center min-h-[calc(100vh-160px)] p-4">
      <Card className="max-w-full w-[340px] min-h-[400px]">
        <CardBody className="overflow-hidden flex flex-col gap-4">
          <Tabs
            selectedKey={selectedTab}
            aria-label="Auth tabs"
            fullWidth
            size="md"
            onSelectionChange={(key) => router.push(`/auth/${key}`)}
          >
            <Tab key="login" title="Login" />
            <Tab key="signup" title="Sign up" />
          </Tabs>
          <div className="flex-grow flex">
            <div className="w-full">{children}</div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
