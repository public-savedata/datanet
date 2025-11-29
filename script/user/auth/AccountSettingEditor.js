import { MainFrame } from "../../home/MainFrame.js";
import { UserAuthentication } from "../UserAuthentication.js";
export class AccountEditor {
    txtUserName;
    SaveButton;
    Form;
    constructor() {
        /** Account Manager */
        this.Form = document.querySelector("#AccounEditorForm");
        this.txtUserName = document.querySelector("#AccounEditorUsernameTextBox");
        this.SaveButton = document.querySelector("#AccounEditorSaveButton");
        this.Init();
    }
    Init() {
        let isloaded = false;
        this.Form.onsubmit = ev => {
            ev.preventDefault();
            this.UpdateAuthentication();
        };
        this.SaveButton.onclick = ev => {
            ev.preventDefault();
            this.UpdateAuthentication();
        };
        this.txtUserName.value = top.user.name;
    }
    UpdateAuthentication() {
        top.user.name = this.txtUserName.value;
        new UserAuthentication().Save();
        MainFrame.UpdateAuthentication();
    }
}
