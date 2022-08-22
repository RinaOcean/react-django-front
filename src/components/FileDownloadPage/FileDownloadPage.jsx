import axios from "axios";
import { useEffect, useState } from "react";
import { useGetItemDetailsMutation, useGetItemDetailsQuery,  useGetRootFolderQuery } from "../../services/api/rootFolder";
import { GET_ROOT_FOLDER_URL } from "../../utils/Urls";
import DataTable from "../elements/DataTable/DataTable";

const FileDownloadPage = () => {
    const columns = [
        { id: "icon", label: "", minWidth: 50, align: "left" },
        { id: "name", label: "Name", minWidth: 170 },
        { id: "obj_type", label: "Type", minWidth: 100 },
        { id: "action", label: "", minWidth: 70, align: "right"},
    ];

    const formdata = new FormData();
    formdata.append("host_name", "192.168.178.122");
    formdata.append("port", 2222);
    formdata.append("username", "tester");
    formdata.append("password", "password");    
    
    const { data } = useGetRootFolderQuery(formdata);
    const [sessionKey, setSessionKey] = useState('');
    const [rows, setRows] = useState([]);
 
    // let sessionKey = data?.session_key || '';
    // let rows = data?.list_of_objects || [];
   
    const [getItemDetails] = useGetItemDetailsMutation();  

    const onItemClick = (row) => {
        const formData = new FormData();
        formData.append("name", row.name);
        formData.append("obj_type", row.obj_type);
        formData.append("session_key", sessionKey);

        getItemDetails(formData)
            .then((res) => {
                if (row.obj_type === 'dir') {
                    console.log("before",rows);
                    setRows(res.data?.list_of_objects);
                    console.log("after", rows);
                }
               
        })          
    }
    
    useEffect(() => {
        if (data) {
            setSessionKey(data?.session_key);
            setRows(data?.list_of_objects);
        }
    },[])
 
    return <DataTable columns={columns} rows={rows} withIcon={true} onItemClick={onItemClick} />;
}

export default FileDownloadPage