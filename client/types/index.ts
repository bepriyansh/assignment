import { DateValue } from "@heroui/react";

export interface IconSvgProps {
  size?: number;
  width?: number;
  height?: number;
  [key: string]: any;
}

export type InterviewStatus = "scheduled" | "completed" | "cancelled";

export interface Interview {
  id: string;
  candidateName: string;
  candidateEmail: string;
  date: DateValue | null;
  time: string;
  duration: string;
  status: InterviewStatus;
}
