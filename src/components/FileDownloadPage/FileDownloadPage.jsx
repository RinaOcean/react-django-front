import axios from "axios";
import { useGetRootFolderMutation } from "../../services/api/rootFolder";
import { GET_ROOT_FOLDER_URL } from "../../utils/Urls";

// let listOfItems = [];

// const getRootFolderList = async () => {
//     const formdata = new FormData();
//     formdata.append("host_name", "192.168.178.122");
//     formdata.append("port", 2222);
//     formdata.append("username", "tester");
//     formdata.append("password", "password");   

//     try {
//         const res = await axios.post(`${GET_ROOT_FOLDER_URL}`, formdata);
//         listOfItems = res.data?.list_of_objects;
        
//     } catch (e) {
//         console.log(e);       
//     }
// }

const FileDownloadPage = () => {
    const formdata = new FormData();
    formdata.append("host_name", "192.168.178.122");
    formdata.append("port", 2222);
    formdata.append("username", "tester");
    formdata.append("password", "password"); 
    const { data, error, isLoading } = useGetRootFolderMutation(formdata);

    console.log(data);
    return (
        <div>
            <p>There's nothing here yet</p>
        </div>
    );
}

export default FileDownloadPage