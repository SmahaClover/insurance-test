"use client";

import { getUsers } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export const DataTable = () => {
  const { data, isPending } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });

  if (isPending) return <h2 className="text-xl">Please Wait...</h2>;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Insurance Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>{user.productPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
