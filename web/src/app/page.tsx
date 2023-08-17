"use client";

import Image from "next/image";
import { trpcClient } from "./services/trpcClient";
import { Table, Button } from "@radix-ui/themes";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { CreateUserModal } from "./components/createUserModal";

export default function Home() {
  const deleteUserMutation = trpcClient.user.deleteUserById.useMutation();

  const users = trpcClient.user.getAll.useQuery();

  const [showModal, setShowModal] = useState(false);

  const createUser = async () => {
    setShowModal(!showModal);
  };

  const deleteUser = async (userId: number) => {
    const result = await deleteUserMutation.mutateAsync(userId);

    if (result) {
      await users.refetch();
    }
  };

  const OnCreateModalClose = async () => {
    setShowModal(false);

    await users.refetch();
  };

  return (
    <>
      <main className="flex flex-col items-center  gap-4 p-24">
        <Button onClick={createUser} className="bg-green-700">
          <PlusIcon /> Create User
        </Button>

        <Table.Root className="table-auto w-[500px]" variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Id</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Firstname</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Lastname</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Age</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {users.data?.map((user) => (
              <Table.Row key={user.id}>
                <Table.RowHeaderCell>{user.id}</Table.RowHeaderCell>
                <Table.Cell>{user.firstName}</Table.Cell>
                <Table.Cell>{user.lastName}</Table.Cell>
                <Table.Cell>{user.age}</Table.Cell>
                <Table.Cell>
                  <Button
                    onClick={() => {
                      deleteUser(user.id);
                    }}
                    className="bg-red-700"
                  >
                    <TrashIcon /> Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </main>
      <CreateUserModal open={showModal} onOpenChange={OnCreateModalClose} />
    </>
  );
}
