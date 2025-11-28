import { MainFrame } from "../../home/MainFrame.js";
import { AuthenticationDataLoader } from "./AuthenticationDataLoader.js";
export class AccountEditor {
    txtUserName;
    SaveButton;
    Form;
    constructor() {
        /** Account Manager */
        this.Form = document.querySelector("#AccountEditor_Form");
        this.txtUserName = document.querySelector("#AccountEditor_UsernameTextBox");
        this.SaveButton = document.querySelector("#AccountEditor_SaveButton");
    }
    Init() {
        let isloaded = false;
        this.Form.onsubmit = ev => {
            ev.preventDefault();
            this.UpdateAuthentication();
        };
        // this.SaveButton.onclick = ev => {
        //     ev.preventDefault();
        //     this.UpdateAuthentication();
        // }
        this.txtUserName.value = top.user.name;
    }
    UpdateAuthentication() {
        top.user.name = this.txtUserName.value;
        new AuthenticationDataLoader().Save();
        MainFrame.UpdateAuthentication();
    }
}
