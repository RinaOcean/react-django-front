// import axios from "axios";
import { Button, IconButton, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useGetItemDetailsMutation,  useGetRootFolderQuery } from "../../services/api/rootFolder";
// import { GET_ROOT_FOLDER_URL } from "../../utils/Urls";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import DataTable from "../elements/DataTable/DataTable";
import { useLocation, useNavigate } from "react-router-dom";
import DataGrid from "../elements/DataGrid";


const FileDownloadPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const columns = [
        { id: "icon", label: "", minWidth: 50, align: "left" },
        { id: "name", label: "Name", minWidth: 170 },
        { id: "obj_type", label: "Type", minWidth: 100 },
        { id: "action", label: "", minWidth: 70, align: "right" },
    ];
    

    const data = location.state;
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("id");
    const [sessionKey, setSessionKey] = useState(data?.session_key || "");
    const [rows, setRows] = useState([]);
    const [folder, setFolder] = useState(null);
    const [path, setPath] = useState(['root']);

    const sortedRows = rows?.reduce((acc, element) => {
        if (element.obj_type === "dir") {
            return [element, ...acc];
        }
        return [...acc, element];
    }, []);

    const sortedFolder = folder?.reduce((acc, element) => {
        if (element.obj_type === "dir") {
            return [element, ...acc];
        }
        return [...acc, element];
    }, []);

    const [getItemDetails, isLoading] = useGetItemDetailsMutation();
  
    const onItemClick = async (row) => {
        const formData = new FormData();
        formData.append("name", row.name);
        formData.append("obj_type", row.obj_type);
        formData.append("session_key", sessionKey);

        let errMsg = "";
        try {
            const res = await getItemDetails(formData)
                if (row.obj_type === "dir") {
                    path.push(row.name);
                    setPath(path);
                    setFolder(res.data?.list_of_objects);
                } else if (row.obj_type === "file" || res?.data?.status === 200) {
                    navigate("/key-upload", {
                        state: {
                            sessionKey: sessionKey,
                            fileName: row.name
                        },
                    });                    
                }

        } catch (e) {
            if (e.request.status === 404) {
                const dirtyString = JSON.stringify(e.response.data.errors);
                errMsg = dirtyString.replace(/[\[\]"{}]/g, "");
            }
            alert(`Failed to connect to sftp. ${errMsg}`);
        }          
    };

    const onBackClickHandler = async () => {
        const formData = new FormData();
        formData.append("name", "..");
        formData.append("obj_type", "dir");
        formData.append("session_key", sessionKey);
        let errMsg = "";
        if (page === 1) {
            try {
                const res = await getItemDetails(formData)
                path.pop();
                await setPath(path);
                setFolder(res.data?.list_of_objects);

            } catch (e) {
                if (e.request.status === 404) {
                const dirtyString = JSON.stringify(e.response.data.errors);
                errMsg = dirtyString.replace(/[\[\]"{}]/g, "");
            }
            alert(`Failed to connect to sftp. ${errMsg}`);
            }
            // getItemDetails(formData).then(async (res) => {               
            //     path.pop();
            //     await setPath(path);
            //     setFolder(res.data?.list_of_objects);
            // });            
        }

        if (page > 1) {
            setPage(page - 1);
        }              
    };
    
    const [isBackButtonClicked, setBackbuttonPress] = useState(false);
    useEffect(() => {
        if (data) {
            setSessionKey(data?.session_key);
            setRows(data?.list_of_objects);
        }
       window.history.pushState(null, null, window.location.pathname);
       window.addEventListener("popstate", onBackButtonEvent);

       //logic for showing popup warning on page refresh
       window.onbeforeunload = function () {        
       };
       return () => {
           window.removeEventListener("popstate", onBackButtonEvent);
       };
      
    }, [rows, data, path]);

    const onBackButtonEvent = (e) => {
        e.preventDefault();
        window.history.pushState(null, null, window.location.pathname);
        onBackClickHandler();        
    };

    return (
        <Stack sx={{ width: "100%", flexDirection: "row", justifyContent: "flex-start" }}>
            <IconButton
                aria-label="back"
                onClick={onBackClickHandler}
                disabled={path.length > 1 ? false : true}
                sx={{ height: "fit-content", marginTop: "27px", padding: 0, color: "#006bb6" }}
            >
                <KeyboardBackspaceRoundedIcon />
            </IconButton>
            <Stack sx={{ width: "100%", direction: "column", marginTop: "24px" }}>
                <h3 style={{ marginBottom: "10px" }}>{path.join("/")}</h3>
                <DataGrid
                    columns={columns}
                    rows={!folder ? sortedRows : sortedFolder}
                    withIcon={true}
                    onClick={onItemClick}
                    // isLoading={isLoading}
                    onPageChange={(page) => setPage(page)}
                    onOrderChange={(sort) => setOrder(sort)}
                    onOrderByChange={(direction) => setOrderBy(direction)}
                    onSetItemsPerPage={(number) => setItemsPerPage(number)}
                    page={page - 1}
                    itemsPerPage={itemsPerPage}
                    order={order}
                    orderBy={orderBy}
                    total={!folder ? sortedRows.length : sortedFolder.length}
                />
            </Stack>
        </Stack>
    );
};

export default FileDownloadPage;