import { Dropdown } from "react-bootstrap";
import { BookmarkStarFill, Check2Square, CheckCircle, PencilSquare, ThreeDotsVertical, Trash } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { RemoveOwnShare, RemoveShareByAdmin, SetOrRemoveFeatured } from "../../redux/actions/ShareBuildApi";

const DropDown = ({ build , reload }) => {
    const activeUser = useSelector((state) => state.profile.data)
    
    
    
    return ( <>
    <div className="position-absolute top-0 end-0">
            <Dropdown align="end" >
            <Dropdown.Toggle
                variant="link"
                className="text-light no-arrow "
                id={`build-actions`}
            >
                <ThreeDotsVertical className="border border-black rounded-circle bg-white p-1" size={25} color="black"/>
            </Dropdown.Toggle>
            <Dropdown.Menu className="bg-dark border-secondary">
            {
                activeUser.role === "Admin" &&
                <>
                {!build.isFeatured ?
                    <Dropdown.Item className="text-warning" onClick={async ()=>{await SetOrRemoveFeatured(build.userBuildId, true); reload() }}>
                    <BookmarkStarFill size={16} className="me-2" /> Set as Featured
                    </Dropdown.Item>
                    :
                    <Dropdown.Item className="text-danger" onClick={async ()=>{await SetOrRemoveFeatured(build.userBuildId, false); reload() }}>
                    <BookmarkStarFill size={16} className="me-2" /> Remove Featured
                    </Dropdown.Item>
                }
                <Dropdown.Divider className="border-secondary" />
            </>
        }


                {
                    activeUser.role === "Admin" ?
                    <Dropdown.Item  className="text-danger" onClick={async ()=>{await RemoveShareByAdmin(build.userBuildId); reload() }}>
                        <Trash size={16} className="me-2" /> Force Stop Share
                    </Dropdown.Item>
                    :
                    <Dropdown.Item  className="text-danger" onClick={async ()=>{await RemoveOwnShare(build.userBuildId); reload() }}>
                    <Trash size={16} className="me-2" /> Stop Sharing
                </Dropdown.Item>
                }
                
            </Dropdown.Menu>
            </Dropdown>
        </div>
    </> );
}

export default DropDown ;