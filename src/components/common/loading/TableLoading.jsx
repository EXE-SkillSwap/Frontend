import { TableCell, TableRow } from "@/components/ui/table";

const TableLoading = () => {
  return (
    <TableRow>
      <TableCell>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-8"></div>
      </TableCell>
      <TableCell>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
      </TableCell>
      <TableCell>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
      </TableCell>
      <TableCell>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
      </TableCell>
      <TableCell>
        <div className="h-6 bg-gray-200 rounded animate-pulse w-32"></div>
      </TableCell>
      <TableCell>
        <div className="h-6 bg-gray-200 rounded animate-pulse w-32"></div>
      </TableCell>
      <TableCell>
        <div className="h-6 bg-gray-200 rounded animate-pulse w-20"></div>
      </TableCell>
      <TableCell>
        <div className="h-8 bg-gray-200 rounded animate-pulse w-8"></div>
      </TableCell>
    </TableRow>
  );
};

export default TableLoading;
