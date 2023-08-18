import editIcon from "@/public/component/icons/icons8-edit-50.png";
import UserIcon from "@/public/component/icons/icons8-user-100.png";
import { Text } from "@/public/styles/chakra";
import "../globals.css";
import { StaticImageData } from "next/image";
import ProfileContainer from "./profile";

export default function profilePage() {

    const UserIconSrc = UserIcon.src;
    const EditIconSrc = editIcon.src;

    return(
        <ProfileContainer>
            <div className="relative">
                <div className="relative justify center" >
                <img
                    src={UserIconSrc}
                    alt="user-icon"
                    style={{
                        width: '75px', 
                        height: '75px',
                        marginLeft: "530px", 
                        marginTop: "50px",
                    }}
                />
                    <Text
                    className="daca-font"
                    fontSize="85px"
                    style={{
                        marginTop: "-80px",
                        marginLeft: "55px",
                    }}
                >
                    PROFILE
                    </Text>
                </div>
            </div>
            
        </ProfileContainer>
    )
}