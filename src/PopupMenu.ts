interface PopupMenuOption {
    label: string;
    action: () => void;
}

export function initializePopupMenu(targetElement: HTMLElement, options: PopupMenuOption[]) {
    function showPopupMenu(e: MouseEvent) {
        e.preventDefault();

        //Remove existing menu, if any.
        const existingMenu = document.getElementById("popup-menu");
        if (existingMenu) existingMenu.remove();

        //Create a new popup menu
        const popupMenu = document.createElement("div");
        popupMenu.id = "popup-menu";
        popupMenu.classList.add("popup-menu");
        popupMenu.style.position = "absolute";
        popupMenu.style.top = `${e.clientY}px`;
        popupMenu.style.left = `${e.clientX}px`;
        popupMenu.style.zIndex = "1000";
        popupMenu.style.backgroundColor = "#fff";
        popupMenu.style.border = "1px solid #ccc";
        popupMenu.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
        popupMenu.style.padding = "8px";
        popupMenu.style.cursor = "pointer";

        //Popup menu options
        options.forEach((option) => {
            const optionElement = document.createElement("div");
            optionElement.textContent = option.label;
            optionElement.style.padding = "4px 8px";
            optionElement.style.cursor = "pointer";
            optionElement.addEventListener("click", () => {
                option.action();
                popupMenu.remove();
            });
            optionElement.addEventListener("mouseover", () => {
                optionElement.style.backgroundColor = "transparent";
            });
            popupMenu.appendChild(optionElement);
        });

        document.body.appendChild(popupMenu);


        //Remove menu on click elsewhere
        document.addEventListener(
            "click",
            () => {
                if (popupMenu) popupMenu.remove();
            },
            { once: true }
        );
    }

    targetElement.addEventListener("contextmenu", showPopupMenu);
}