"use client";
import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Callout, Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { BiErrorCircle } from "react-icons/bi";

const useUser = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((response) => response.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

interface Props {
  issue: Issue;
  onUpdate: () => void;
}

const AssigneeSelect = ({ issue, onUpdate }: Props) => {
  const assignIssue = (userId: String) => {
    axios
      .patch("/api/issues/" + issue.id, {
        assignedToUserId: userId === "none" ? null : userId,
        status: userId === "none" ? issue.status : "IN_PROGRESS",
      })
      .catch(() => toast.error("Coult not save changes"));
    if (userId !== "none") {
      onUpdate();
    }
  };

  const { data: users, error, isLoading } = useUser();

  if (isLoading) return <Skeleton />;
  if (error)
    return (
      <Callout.Root className="mb-5" color="red" size="1" variant="outline">
        <Callout.Icon>
          <BiErrorCircle />
        </Callout.Icon>
        <Callout.Text>Error Loading Assignees</Callout.Text>
      </Callout.Root>
    );

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || "none"}
        onValueChange={assignIssue}
      >
        <Select.Trigger placeholder="Assign..."></Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="none">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AssigneeSelect;
