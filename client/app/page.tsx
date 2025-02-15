"use client";

import type { Interview } from "@/types";

import React from "react";
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
} from "@heroui/react";

import InterviewForm from "@/components/InterviewForm";
import InterviewCard from "@/components/InterviewCard";

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [interviews, setInterviews] = React.useState<Interview[]>([]);
  const [selectedInterview, setSelectedInterview] = React.useState<
    Interview | undefined
  >();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (data: Omit<Interview, "id">) => {
    setIsLoading(true);
    try {
      // TODO: Implement API call to create/update interview
      if (selectedInterview) {
        // Update existing interview
      } else {
        // Create new interview
      }
      onOpenChange();
    } catch (error) {
      console.error("Error:", error);
    }
    setIsLoading(false);
  };

  const handleEdit = (interview: Interview) => {
    setSelectedInterview(interview);
    onOpen();
  };

  const handleDelete = async (id: string) => {
    // TODO: Implement API call to delete interview
  };

  const handleDrawerClose = () => {
    setSelectedInterview(undefined);
    onOpenChange();
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="flex flex-col w-full px-4 md:px-0 md:w-3/4">
        <div className="flex justify-between mb-6">
          <h2 className="text-xl font-semibold">Upcoming Interviews</h2>
          <Button color="primary" onPress={onOpen}>
            + Schedule Interview
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {interviews.map((interview) => (
            <InterviewCard
              key={interview.id}
              interview={interview}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>

        <Drawer
          backdrop="blur"
          isOpen={isOpen}
          onOpenChange={handleDrawerClose}
        >
          <DrawerContent>
            <DrawerHeader className="flex flex-col gap-1">
              {selectedInterview ? "Edit Interview" : "Schedule New Interview"}
            </DrawerHeader>
            <DrawerBody>
              <InterviewForm
                initialData={selectedInterview}
                isLoading={isLoading}
                onClose={handleDrawerClose}
                onSubmit={handleSubmit}
              />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
    </section>
  );
}
