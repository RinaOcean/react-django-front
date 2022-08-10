import axios from "axios";
import { GET_ROOT_FOLDER_URL } from "../../utils/Urls";

const getRootFolderList = async () => {
    const formdata = new FormData();
    formdata.append("host_name", "192.168.178.122");
    formdata.append("port", 2222);
    formdata.append("username", "tester");
    formdata.append("password", "password");

   let listOfItems = [];

    try {
        const res = await axios.post(`${GET_ROOT_FOLDER_URL}`, formdata);
        listOfItems = res.data?.list_of_objects;
        console.log(res);
    } catch (e) {
        console.log(e);       
    }

    return listOfItems;
}

const FileDownloadPage = () => {
    const list = getRootFolderList();

    // console.log(list);
    return (
        <div>
            <p>There's nothing here yet</p>
        </div>
    );
}

export default FileDownloadPage