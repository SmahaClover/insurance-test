import { DataTable } from "@/components/DataTable";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default function Dashboard() {
  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="p-20">
        <DataTable />
      </div>
    </HydrationBoundary>
  );
}
