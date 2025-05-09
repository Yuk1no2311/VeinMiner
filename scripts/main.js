//@ts-check

import { world, system } from "@minecraft/server";
import "./config/cc";
import "./config/config";
import "./config/form";

//Minecraft Ores List
const ores = ["minecraft:coal_ore", "minecraft:iron_ore", "minecraft:gold_ore", "minecraft:diamond_ore", "minecraft:emelard", "minecraft:redstone_ore", "minecraft:copper_ore", "minecraft:lapis_lazuli"]
world.afterEvents.worldLoad.subscribe(() => {
    const a = ores[0];
    world.sendMessage(`${a}`);
});

let LBI = null;
//Save ev
world.afterEvents.playerBreakBlock.subscribe(ev => {
    LBI = ev;
});
/*
＊メモ＊
・破壊したブロックのデータ
・破壊したブロックの周りのデータ
・マルチ対応させるかどうか
 */
let a = 0;
system.runInterval(() => {
    const player = world.getAllPlayers()[0];
    if (!player) return;
    if (player.isSneaking && LBI?.player === player) {
        /**
         * @type {import("@minecraft/server").PlayerBreakBlockAfterEvent}
         */
        const { block, itemStackBeforeBreak, brokenBlockPermutation } = LBI;
        if (block && itemStackBeforeBreak?.hasTag("is_pickaxe")) {
            const broken = brokenBlockPermutation.type;
            //ores 以外の値になるまで検知
            /**
             * @param {Number} amount -config amount
             */
           // for (a = 0, a > amount, a++) { }
            const n = block.north(1);
            const s = block.south(1);
            const w = block.west(1);
            const e = block.east(1);
            const above = block.above(1);
            const below = block.below(1);

            world.sendMessage(`${broken.id}`);
        }
        else {
            return;
        };

        LBI = null;
    };
});