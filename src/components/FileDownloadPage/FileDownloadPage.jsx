// import axios from "axios";
import { Button, IconButton, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useGetItemDetailsMutation,  useGetRootFolderQuery } from "../../services/api/rootFolder";
// import { GET_ROOT_FOLDER_URL } from "../../utils/Urls";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import DataTable from "../elements/DataTable/DataTable";
import { useLocation, useNavigate } from "react-router-dom";


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
    const [sessionKey, setSessionKey] = useState(data?.session_key || "");
    const [rows, setRows] = useState([]);
    const [folder, setFolder] = useState(null);
    const [path, setPath] = useState(['root']);
    
    const sortededRows = rows?.reduce((acc, element) => {
        if (element.obj_type === "dir") {
            return [element, ...acc];
        }
        return [...acc, element];
    }, []);

    const sortededFolder = folder?.reduce((acc, element) => {
        if (element.obj_type === "dir") {
            return [element, ...acc];
        }
        return [...acc, element];
    }, []);

    const [getItemDetails] = useGetItemDetailsMutation();
  
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

    const onBackClickHandler = () => {
        const formData = new FormData();
        formData.append("name", "..");
        formData.append("obj_type", "dir");
        formData.append("session_key", sessionKey);

        
        getItemDetails(formData).then(async (res) => {
            path.pop();
            await setPath(path);
            setFolder(res.data?.list_of_objects);
        });
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
                <DataTable
                    columns={columns}
                    rows={!folder ? sortededRows : sortededFolder}
                    withIcon={true}
                    onItemClick={onItemClick}
                />
            </Stack>
        </Stack>
    );
};

export default FileDownloadPage