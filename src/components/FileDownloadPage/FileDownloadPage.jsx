import axios from "axios";
import { useGetRootFolderMutation, useGetRootFolderQuery } from "../../services/api/rootFolder";
import { GET_ROOT_FOLDER_URL } from "../../utils/Urls";
import DataTable from "../elements/DataTable/DataTable";

// let listOfItems = [];
// const getRootFolderList = async () => {
//        const formdata = new FormData();
//        formdata.append("host_name", "192.168.178.122");
//        formdata.append("port", 2222);
//        formdata.append("username", "tester");
//        formdata.append("password", "password");
//        try {
//            const res = await axios.post(`${GET_ROOT_FOLDER_URL}`, formdata);
//            listOfItems = res.data.list_of_objects;
//        } catch (e) {
//            console.log(e);
//        }
// }

const FileDownloadPage = () => {
    const formdata = new FormData();
    formdata.append("host_name", "192.168.178.122");
    formdata.append("port", 2222);
    formdata.append("username", "tester");
    formdata.append("password", "password");
    
    const { data } = useGetRootFolderQuery(formdata);
    // getRootFolderList();
    console.log(data);
    
    const columns = [
        { id: "icon", label: "", minWidth: 50, align: "left" },
        { id: "name", label: "Name", minWidth: 170 },
        { id: "obj_type", label: "Type", minWidth: 100 },
        { id: "action", label: "", minWidth: 70, align: "right"},
    ];
    
    const rows = data?.list_of_objects || [];

    return <DataTable columns={columns} rows={rows} withIcon={true} />;
}

export default FileDownloadPage