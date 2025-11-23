import{createNode} from"./domUtil.js";



export function createSuggestion() {

    const template = {
        tag: "section",
        class: "section-suggestion",
        children: [
            { tag: "h2", text: "Master Similaires" },
            { tag: "div", class: "carte-suggestion" }
        ]
    };

    return createNode(template);
}