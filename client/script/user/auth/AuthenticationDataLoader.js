export class AuthenticationDataLoader {
    Load() {
        if (!top.user)
            top.user = {};
        var token = localStorage.getItem("user-auth");
        if (token) {
            top.user.auth = JSON.parse(token);
            return;
        }
        top.user.auth = { uid: this.generateUID(), name: "user" };
        return;
    }
    Save() {
        localStorage.setItem("user-auth", JSON.stringify(top.user.auth));
    }
    // Generate UID in format: xxxx-xxxx-4xxx-xxxx (hex, lowercase)
    generateUID() {
        const bytes = new Uint8Array(8); // enough entropy for 12 random hex chars + separators
        crypto.getRandomValues(bytes);
        // Convert bytes to hex
        const hex = [...bytes].map(b => b.toString(16).padStart(2, '0')).join('');
        // Build segments:
        // - take 4 hex chars
        const s1 = hex.slice(0, 4);
        const s2 = hex.slice(4, 8);
        // - version nibble fixed to '4', followed by 3 random hex chars
        const s3 = '4' + hex.slice(8, 11);
        const s4 = hex.slice(11, 15);
        return `${s1}-${s2}-${s3}-${s4}`;
    }
}
