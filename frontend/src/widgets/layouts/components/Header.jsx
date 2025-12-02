import CustomSelect from "../../atomics/CustomSelect";
import LanguageSelector from "../components/LanguageSelector";
import { ThemeSwitch } from "../components/ThemeSwitch";

export function Header() {
    return (
        <>
            <div className="full-w row-left gap">
                {/* <img src="/deploy/docker.svg" alt="Logo" className="logo icon"/> */}
                <img src="logo2.svg" alt="Logo" className="logo icon"/>
                <div className="column-left">
                    <h1 className="h1">HERMES</h1>            
                    <p className="h1-sec">S E R V I C E S</p>            
                </div>
            </div>
            <div className="full-w row-right">
                <div className="flex-center gap10">
                    <LanguageSelector />
                    <ThemeSwitch />
                    <div className="user-image-container">
                        <img src="./global/user.svg" alt="user" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
