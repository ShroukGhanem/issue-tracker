"use client";
import { User } from "@prisma/client";
import { Callout, Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "@/app/components";
import { BiErrorCircle } from "react-icons/bi";

const AssigneeSelect = () => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("x/api/users").then((response) => response.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

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
    <Select.Root>
      <Select.Trigger placeholder="Assign..."></Select.Trigger>
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
