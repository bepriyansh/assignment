import type { Interview, InterviewStatus } from "@/types";

import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Chip,
} from "@heroui/react";

import { formatDate, formatTime } from "@/lib/utils";

interface InterviewCardProps {
  interview: Interview;
  onEdit: (interview: Interview) => void;
  onDelete: (id: string) => void;
}

const InterviewCard: React.FC<InterviewCardProps> = ({
  interview,
  onEdit,
  onDelete,
}) => {
  const statusColors: Record<InterviewStatus, string> = {
    scheduled: "primary",
    completed: "success",
    cancelled: "danger",
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex justify-between">
        <div>
          <h4 className="text-lg font-semibold">{interview.candidateName}</h4>
          <p className="text-small text-default-500">
            {interview.candidateEmail}
          </p>
        </div>

        <Chip
          //@ts-ignore
          color={statusColors[interview.status]}
          size="sm"
        >
          {interview.status}
        </Chip>
      </CardHeader>
      <CardBody>
        <div className="flex flex-col gap-2">
          <p>
            <span className="font-semibold">Date:</span>{" "}
            {
              //@ts-ignore
              formatDate(interview.date)
            }
          </p>
          <p>
            <span className="font-semibold">Time:</span>{" "}
            {formatTime(interview.time)}
          </p>
          <p>
            <span className="font-semibold">Duration:</span>{" "}
            {interview.duration} minutes
          </p>
        </div>
      </CardBody>
      <CardFooter className="flex justify-end gap-2">
        <Button
          color="warning"
          variant="flat"
          onPress={() => onEdit(interview)}
        >
          Edit
        </Button>
        <Button
          color="danger"
          variant="flat"
          onPress={() => onDelete(interview.id)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InterviewCard;
