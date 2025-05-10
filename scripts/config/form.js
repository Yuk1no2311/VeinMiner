//@ts-check
import { world, Player } from "@minecraft/server";
import { ActionFormData, ModalFormData, MessageFormData, FormCancelationReason } from "@minecraft/server-ui";
/**
 * 
 * @param {Player} player 
 */
export function config1(player) {
    const form = new ActionFormData();
    form.body("");
    form.title("Config Form");
    form.button("button");
    form.divider(); //線
    form.header("header"); //見出し
    form.label("label"); //小見出し
    form.show(player).then((res) => {
        if (res.selection == 0) {
            player.sendMessage("test");
        }
        if (res.cancelationReason == FormCancelationReason.UserBusy) {
            config1(player);
            return;
        }
    })};