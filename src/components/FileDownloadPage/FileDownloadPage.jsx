// import axios from "axios";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetItemDetailsMutation,  useGetRootFolderQuery } from "../../services/api/rootFolder";
// import { GET_ROOT_FOLDER_URL } from "../../utils/Urls";
import DataTable from "../elements/DataTable/DataTable";

const FileDownloadPage = () => {
    const columns = [
        { id: "icon", label: "", minWidth: 50, align: "left" },
        { id: "name", label: "Name", minWidth: 170 },
        { id: "obj_type", label: "Type", minWidth: 100 },
        { id: "action", label: "", minWidth: 70, align: "right" },
    ];

    const formdata = new FormData();
    formdata.append("host_name", "192.168.178.122");
    formdata.append("port", 2222);
    formdata.append("username", "tester");
    formdata.append("password", "password");

    const { data, isLoading, refetch } = useGetRootFolderQuery(formdata);
    const [sessionKey, setSessionKey] = useState(data?.session_key || "");
    const [rows, setRows] = useState([]);
    const [folder, setFolder] = useState(null);
    const [path, setPath] = useState('root folder');

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
            if (row.obj_type === "dir") {
                setFolder(res.data?.list_of_objects);
                setPath(path + `/${row.name}`);
                // refetch()
                // console.log(path);
            }
            console.log(res);
        });
    };

    useEffect(() => {
        if (data && !isLoading) {
            setSessionKey(data?.session_key);
            setRows(data?.list_of_objects);
        }
    }, [rows, data, path]);

    return (
        <Stack sx={{ width: "100%", direction: "column", marginTop: "24px" }}>
            <h3 style={{marginBottom:'10px'}}>{path}</h3>
            <DataTable                
                columns={columns}
                rows={!folder ? sortededRows : sortededFolder}
                withIcon={true}
                onItemClick={onItemClick}
            />
        </Stack>
    );
};

export default FileDownloadPage