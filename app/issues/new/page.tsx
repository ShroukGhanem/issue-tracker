import dynamic from "next/dynamic";
import IssueFormSkeleton from "../components/IssueFormSkeleton";
import { Metadata } from "next";

const IssueForm = dynamic(() => import("@/app/issues/components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;

export const metadata: Metadata = {
  title: "Issue Tracker - Create Issue",
  description: "Create new issue",
};
