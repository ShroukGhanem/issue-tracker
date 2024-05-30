"use client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import AssigneeSelect from "./AssigneeSelect";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import { Issue } from "@prisma/client";
import { useState } from "react";
import axios from "axios";

interface Props {
  issue: Issue;
  userValidated: boolean;
}

const IssueDetailsContainer = ({ issue, userValidated }: Props) => {
  const [currentIssue, setCurrentIssue] = useState<Issue>(issue);

  const onAssigneeUpdated = () => {
    setCurrentIssue({ ...currentIssue, status: "IN_PROGRESS" });
  };
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={currentIssue} />
      </Box>
      {userValidated && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={currentIssue} onUpdate={onAssigneeUpdated} />
            <EditIssueButton issueId={currentIssue.id} />
            <DeleteIssueButton issueId={currentIssue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailsContainer;
