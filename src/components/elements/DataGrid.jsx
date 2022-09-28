import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    IconButton,
    Stack,
    SvgIcon,
} from "@mui/material";
import FolderTwoToneIcon from "@mui/icons-material/FolderTwoTone";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import DownloadForOfflineRoundedIcon from "@mui/icons-material/DownloadForOfflineRounded";


function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort, columns } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow
                sx={{ "& .MuiTableCell-head": { color: "var(--gray)", padding: "11px 10px" } }}
            >
                {columns.map((column) => (
                    <TableCell
                        key={column.id}
                        sortDirection={orderBy === column.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === column.id}
                            direction={orderBy === column.id ? order : "asc"}
                            onClick={createSortHandler(column.id)}
                        >
                            {column.label}
                            {orderBy === column.label ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}                
            </TableRow>
        </TableHead>
    );
}

export default function DataGrid({
    columns,
    rows,
    isLoading,
    onPageChange,
    onOrderChange,
    onOrderByChange,
    onSetItemsPerPage,
    page,
    total,
    itemsPerPage,
    order,
    orderBy,    
    onClick,
}) {
    
    const [currentRow, setCurrentRow] = useState({});

    if (isLoading) {
        return <CircularProgress />;
    }
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        onOrderChange(isAsc ? "desc" : "asc");
        onOrderByChange(property);
    };

    const handleChangePage = (event, newPage) => {
        console.log('page====>>>>', page);
        console.log("newPage====>>>>", newPage);
        onPageChange(newPage + 1);
    };

    const handleChangeRowsPerPage = (event) => {
        onSetItemsPerPage(parseInt(event.target.value, 10));
        onPageChange(1);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Paper sx={{ mb: 2, mt: "20px", boxShadow: "none" }}>
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} size="small" aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            columns={columns}
                        />
                        <TableBody>
                            {rows
                                ?.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow
                                            tabIndex={-1}
                                            key={row.id}
                                            onClick={onClick ? () => onClick(row) : undefined}
                                            style={{ cursor: "pointer" }}
                                            sx={{
                                                height: "39px",
                                                "& .MuiTableCell-root ": {
                                                    padding: "11px 10px",
                                                    borderBottom: "1px solid",
                                                    borderBottomColor: "var(--light-gray)",
                                                },
                                            }}
                                        >
                                            {columns.map((column) => {
                                                let value = row[column.id];
                                                if (column.id === "icon") {
                                                    value =
                                                        row.obj_type === "dir" ? (
                                                            <FolderTwoToneIcon />
                                                        ) : (
                                                            <InsertDriveFileOutlinedIcon />
                                                        );
                                                } else if (column.id === "action") {
                                                    value =
                                                        row.obj_type === "file" ? (
                                                            <IconButton
                                                                aria-label="download"
                                                                align="right"
                                                                onClick={() => console.log(row)}
                                                                style={{ cursor: "pointer" }}
                                                            >
                                                                <DownloadForOfflineRoundedIcon />
                                                            </IconButton>
                                                        ) : null;
                                                }

                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={total}
                    rowsPerPage={itemsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}
