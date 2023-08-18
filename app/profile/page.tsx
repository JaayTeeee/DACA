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
                <div className="relative justify-center align-items-center" style={{marginLeft:'10px', marginBottom:'5px'}}>
                    
          <div
            className="greyContainer"
            style={{
              position: "relative",
              top:"-200px",
              left: "520px",
              zIndex: "-1",
            }}
          >      
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
                        marginTop: "-100px",
                        marginLeft: "55px",
                    }}
                >
                    PROFILE
                    </Text>
                </div>
                </div>



                <div>
                    <Text
                    className="body_font"
                    fontSize="40px"
                    style={{
                        marginTop: "60px",
                        marginLeft: "40px",
                    }}
                >
                    Username: 
                    </Text>
                    <Text
                    className="body_font"
                    fontSize="40px"
                    style={{
                        marginTop: "60px",
                        marginLeft: "40px",
                    }}
                >
                    Age:
                    Gender:
                    Chat Language Preference:
                </Text>
            </div>
        </div>
        </ProfileContainer>
    )
}