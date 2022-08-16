import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, IconButton, Stack } from "@mui/material";
import FolderTwoToneIcon from "@mui/icons-material/FolderTwoTone";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import DownloadForOfflineRoundedIcon from "@mui/icons-material/DownloadForOfflineRounded";

export default function DataTable({ columns, rows, onItemClick }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{
                                        minWidth: column.minWidth,
                                        backgroundColor: "rgba(0, 0, 0, 0.03)",
                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.code}
                                        onClick={() => onItemClick(row)}
                                        style={{cursor:"pointer"}}
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

                                        {/* {withIcon && (
                                            <TableCell align="left" style={{ width: 250 }}>
                                                {row.obj_type === "dir" ? (
                                                    <FolderTwoToneIcon />
                                                ) : (
                                                    <InsertDriveFileTwoToneIcon />
                                                )}
                                            </TableCell>
                                        )} */}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
