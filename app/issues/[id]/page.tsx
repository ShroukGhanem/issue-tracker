import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import { number } from "zod";

interface Props {
  params: {
    id: string;
  };
}

const IssueDetailsPage = async ({ params: { id } }: Props) => {
  const intId = parseInt(id);
  if (typeof intId !== "number") notFound();
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!issue) notFound();

  return (
    <div>
      <p>{issue.id}</p>
      <p>{issue.title}</p>
      <p>{issue.description}</p>
      <p>{issue.createdAt.toDateString()}</p>
    </div>
  );
};

export default IssueDetailsPage;
