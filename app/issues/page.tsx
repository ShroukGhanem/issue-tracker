import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import Pagination from "../components/Pagination";
import IssuesActions from "./IssuesActions";
import IssuesTable, { columnNames, IssueQuery } from "./IssuesTable";
import { Metadata } from "next";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = { status };
  const orderBy = columnNames.includes(searchParams.orderBy)
    ? {
        [searchParams.orderBy]: "asc",
      }
    : undefined;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({
    where,
  });

  return (
    <div>
      <IssuesActions />
      <IssuesTable searchParams={searchParams} issues={issues} />
      <Flex justify="end" mt="3">
        <Pagination
          itemCount={issueCount}
          pageSize={pageSize}
          currentPage={page}
        />
      </Flex>
    </div>
  );
};

export const dynamic = "force-dynamic";
export default IssuesPage;
export const metadata: Metadata = {
  title: "Issue Tracker - Issues",
  description: "View all project issues",
};
