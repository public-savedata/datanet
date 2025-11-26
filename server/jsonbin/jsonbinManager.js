import axios from "axios";
export class jsonbinManager {
    BIN_ID;
    API_KEY;
    constructor() {
        this.BIN_ID = "692581ccae596e708f6fb4e7";
        this.API_KEY = "$2a$10$N/qqhqA0Od9QEwb8OEBW6OxPwkhyJJNt4TL2cAR6hvSrVfYkgOqmu";
    }
    async updateBin(newData) {
        try {
            const response = await axios.put(`https://api.jsonbin.io/v3/b/${this.BIN_ID}`, newData, {
                headers: {
                    "Content-Type": "application/json",
                    "X-Master-Key": this.API_KEY
                }
            });
            console.log("Updated successfully:", response.data);
        }
        catch (error) {
            console.error("Error updating bin:", error.response?.data || error.message);
        }
    }
    test() {
        const newData = {
            name: "Hossein",
            project: "Telegram Notification System",
            status: "updated"
        };
        this.updateBin(newData);
    }
}
