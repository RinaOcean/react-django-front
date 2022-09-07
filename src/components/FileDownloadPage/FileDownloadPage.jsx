// import axios from "axios";
import { Button, IconButton, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useGetItemDetailsMutation,  useGetRootFolderQuery } from "../../services/api/rootFolder";
// import { GET_ROOT_FOLDER_URL } from "../../utils/Urls";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import DataTable from "../elements/DataTable/DataTable";
import { useNavigate } from "react-router-dom";

const FileDownloadPage = () => {
    const columns = [
        { id: "icon", label: "", minWidth: 50, align: "left" },
        { id: "name", label: "Name", minWidth: 170 },
        { id: "obj_type", label: "Type", minWidth: 100 },
        { id: "action", label: "", minWidth: 70, align: "right" },
    ];

    const formdata = new FormData();
    formdata.append("host_name", "192.168.1.91");
    formdata.append("port", 2222);
    formdata.append("username", "tester");
    formdata.append("password", "password");

    const { data, isLoading, refetch } = useGetRootFolderQuery(formdata);
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
  
    const onItemClick = (row) => {
        const formData = new FormData();
        formData.append("name", row.name);
        formData.append("obj_type", row.obj_type);
        formData.append("session_key", sessionKey);

        getItemDetails(formData).then((res) => {
            // console.log(res);
            if (row.obj_type === "dir") {
                path.push(row.name);
                setPath(path);
                setFolder(res.data?.list_of_objects);
            }
        });
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
        if (data && !isLoading) {
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
            {/* <Button>Back</Button> */}
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