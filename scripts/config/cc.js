//@ts-check

import { system } from "@minecraft/server";
import { config } from "./form.js";
system.beforeEvents.startup.subscribe((init) => {
    init.itemComponentRegistry.registerCustomComponent("c:config", {
        onUse(ev) {
            const { itemStack, source } = ev;
            if (itemStack?.typeId == "d:config") {
                config(source);
                return;
            };
        }
    });
});