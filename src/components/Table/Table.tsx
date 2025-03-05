import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import React from "react";

export interface ColumnDefinition<T> {
  header: string;
  accessor?: keyof T;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

interface TableCustomProps<T> {
  items: T[];
  columns: ColumnDefinition<T>[];
  isLoading: boolean;
  onSortChange?: (columnId: string) => void;
  orderBy: string | null;
  order: "asc" | "desc";
  actionLabel?: string;
  emptyMessage?: string;
  listActions?: MenuDropdownOptions<T>[];
}

export interface MenuDropdownOptions<T> {
  actionName: string;
  actionEvent: (item: T) => void;
  conditionShow?: (item: T) => boolean;
}

const TableCustom = <T extends {}>({
  items,
  columns,
  isLoading,
  onSortChange,
  orderBy,
  order,
  actionLabel = "Acciónes",
  emptyMessage = "Sin resultados",
  listActions,
}: TableCustomProps<T>): React.ReactElement => {
  return (
    <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
      <Table>
        <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.header} sx={{ fontWeight: "bold" }}>
                {col.sortable ? (
                  <TableSortLabel
                    active={orderBy === col.accessor}
                    direction={orderBy === col.accessor ? order : "asc"}
                    onClick={() =>
                      onSortChange &&
                      col.accessor &&
                      onSortChange(col.accessor as string)
                    }
                  >
                    {col.header}
                  </TableSortLabel>
                ) : (
                  col.header
                )}
              </TableCell>
            ))}
            {listActions && <TableCell align="center">{actionLabel}</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                {columns.map((col) => (
                  <TableCell key={col.header}>
                    <Skeleton variant="text" />
                  </TableCell>
                ))}
                {listActions && <TableCell />}
              </TableRow>
            ))
          ) : items.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length + (listActions ? 1 : 0)}
                align="center"
              >
                <Typography color="textSecondary">{emptyMessage}</Typography>
              </TableCell>
            </TableRow>
          ) : (
            items.map((item, rowIndex) => (
              <TableRow key={rowIndex} hover>
                {columns.map((col) => (
                  <TableCell key={col.header}>
                    {col.accessor
                      ? col.render
                        ? col.render(item)
                        : String(item[col.accessor])
                      : null}
                  </TableCell>
                ))}
                {listActions && (
                  <TableCell align="center">
                    <ActionMenu item={item} listActions={listActions} />
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const ActionMenu = <T extends {}>({
  item,
  listActions,
}: {
  item: T;
  listActions: MenuDropdownOptions<T>[];
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {listActions.map((actionvar) =>
          actionvar.conditionShow?.(item) ?? true ? (
            <MenuItem
              key={actionvar.actionName}
              onClick={() => {
                actionvar.actionEvent(item);
                handleClose();
              }}
            >
              {actionvar.actionName}
            </MenuItem>
          ) : null
        )}
      </Menu>
    </>
  );
};

export default TableCustom;
