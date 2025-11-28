export class TextBlock {
    El;
    constructor(el) {
        this.El = el;
    }
    static From(id) {
        return new TextBlock(document.querySelector(`#${id}`));
    }
    set Text(v) {
        this.El.textContent = v;
    }
}
export class MainFrameClass {
    UpdateAuthentication() {
        const txt = TextBlock.From("AuthenticationDisplayTitle");
        txt.Text = top.user.name;
    }
}
