import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssuesSummary = ({ open, inProgress, closed }: Props) => {
  const containers: {
    label: string;
    value: number;
    status: Status;
    color: "red" | "green" | "violet";
  }[] = [
    { label: "Open Issues", value: open, status: "OPEN", color: "red" },
    {
      label: "In Progress Issues",
      value: inProgress,
      status: "IN_PROGRESS",
      color: "violet",
    },
    { label: "Closed Issues", value: closed, status: "CLOSED", color: "green" },
  ];

  return (
    <Flex gap="2">
      {containers.map((container) => (
        <Card key={container.status}>
          <Flex direction="column" gap="1">
            <Link
              className="text-sm font-medium"
              href={`/issues?status=${container.status}`}
            >
              <Text color={container.color}>{container.label}</Text>
            </Link>
            <Text size="5" className="font-bold">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssuesSummary;
