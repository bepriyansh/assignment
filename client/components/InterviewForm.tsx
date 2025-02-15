import type { Interview } from "@/types";

import React from "react";
import {
  Input,
  Button,
  Select,
  SelectItem,
  DatePicker,
  TimeInput,
  DateValue,
  Textarea,
} from "@heroui/react";

interface InterviewFormProps {
  onSubmit: (data: Omit<Interview, "id">) => void;
  onClose: () => void;
  initialData?: Interview;
  isLoading?: boolean;
}

const InterviewForm: React.FC<InterviewFormProps> = ({
  onSubmit,
  onClose,
  initialData,
  isLoading = false,
}) => {
  const [formData, setFormData] = React.useState<Omit<Interview, "id">>({
    candidateName: initialData?.candidateName || "",
    candidateEmail: initialData?.candidateEmail || "",
    date: initialData?.date || null,
    time: initialData?.time || "",
    duration: initialData?.duration || "60",
    status: initialData?.status || "scheduled",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
      | { target: { name: string; value: any } },
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Input
        isRequired
        label="Interview Name"
        name="interviewName"
        placeholder="Enter interview name"
        value={formData.candidateName}
        onChange={handleChange}
      />
      <Textarea
        isRequired
        label="About Interview"
        name="aboutInterview"
        placeholder="Enter about interview"
        type="textarea"
        value={formData.candidateEmail}
        onChange={handleChange}
      />
      <DatePicker
        isRequired
        showMonthAndYearPickers
        label="Interview Date"
        name="date"
        value={formData.date}
        variant="bordered"
        onChange={(value: DateValue | null) =>
          handleChange({
            target: { name: "date", value },
          })
        }
      />
      <TimeInput
        isRequired
        label="Interview Time"
        //@ts-ignore
        onChange={(value: string) =>
          handleChange({
            target: { name: "time", value },
          })
        }
        name="time"
        //@ts-ignore
        value={formData.time}
      />
      <Select
        isRequired
        label="Duration (minutes)"
        name="duration"
        value={formData.duration}
        onChange={handleChange}
      >
        <SelectItem key="30" value="30">
          30 minutes
        </SelectItem>
        <SelectItem key="60" value="60">
          1 hour
        </SelectItem>
        <SelectItem key="90" value="90">
          1.5 hours
        </SelectItem>
        <SelectItem key="120" value="120">
          2 hours
        </SelectItem>
      </Select>
      <Select
        isRequired
        label="Status"
        name="status"
        value={formData.status}
        onChange={handleChange}
      >
        <SelectItem key="scheduled" value="scheduled">
          Scheduled
        </SelectItem>
        <SelectItem key="completed" value="completed">
          Completed
        </SelectItem>
        <SelectItem key="cancelled" value="cancelled">
          Cancelled
        </SelectItem>
      </Select>
      <div className="flex justify-end gap-2 mt-4">
        <Button color="danger" variant="flat" onPress={onClose}>
          Cancel
        </Button>
        <Button color="primary" isLoading={isLoading} type="submit">
          {initialData ? "Update" : "Schedule"} Interview
        </Button>
      </div>
    </form>
  );
};

export default InterviewForm;
