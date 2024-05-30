import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import AssigneeSelect from "./AssigneeSelect";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import { cache } from "react";
import IssueDetailsContainer from "./IssueDetailsContainer";

interface Props {
  params: {
    id: string;
  };
}

const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueDetailsPage = async ({ params: { id } }: Props) => {
  const intId = parseInt(id);
  if (typeof intId !== "number") notFound();
  const issue = await fetchIssue(parseInt(id));

  if (!issue) notFound();
  const session = await getServerSession(authOptions);

  return (
    <IssueDetailsContainer
      issue={issue}
      userValidated={session ? true : false}
    />
  );
};

export default IssueDetailsPage;

export async function generateMetadata({ params }: Props) {
  const issue = await fetchIssue(parseInt(params.id));

  return {
    title: issue?.title,
    description: "Viewing issue details",
  };
}
