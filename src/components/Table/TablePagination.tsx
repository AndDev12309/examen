import React from "react";
import { TablePagination } from "@mui/material";

interface TablePaginationComponentProps {
  total: number;
  rowsPerPage: number;
  page: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRowsPerPage: number) => void;
}

const TablePaginationComponent: React.FC<TablePaginationComponentProps> = ({
  total,
  rowsPerPage,
  page,
  onPageChange,
  onRowsPerPageChange,
}) => {
  return (
    <TablePagination
      component="div"
      count={total}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={(_, newPage) => onPageChange(newPage)}
      onRowsPerPageChange={(event) =>
        onRowsPerPageChange(parseInt(event.target.value, 10))
      }
    />
  );
};

export default TablePaginationComponent;
