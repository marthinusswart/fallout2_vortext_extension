import path from "path";
import { fs, log, types, util } from "vortex-api";
import { disableCheatChestMod, disableStartChestMod, enableCheatChestMod, enableStartChestMod } from "./cheatmods";
import { DEFAULT_EXECUTABLE, GAME_ID, STEAMAPP_ID } from "./common";

function findGame() {
  return util.GameStoreHelper.findByAppId([STEAMAPP_ID]).then((game) => game.gamePath);
}

function prepareForModding(discovery) {
  return fs.ensureDirWritableAsync(path.join(discovery.path, "backups"));
}

function modEnabledCallback(context: types.IExtensionContext, profileId: string, modId: string) {
  if (modId === "Cheat Chest 1.0-15-1-0") enableCheatChestMod(context, modId);
  if (modId === "Leather Armor Basic Kit-27-1-1-1585807325") enableStartChestMod(context, modId);
}

function modDisabledCallback(context: types.IExtensionContext, profileId: string, modId: string) {
  if (modId === "Cheat Chest 1.0-15-1-0") disableCheatChestMod(context, modId);
  if (modId === "Leather Armor Basic Kit-27-1-1-1585807325") disableStartChestMod(context, modId);
}

function main(context: types.IExtensionContext) {
  context.registerGame({
    id: GAME_ID,
    name: "Fallout 2",
    mergeMods: false,
    queryPath: findGame,
    supportedTools: [],
    queryModPath: () => ".",
    logo: "gameart.jpg",
    executable: () => DEFAULT_EXECUTABLE,
    requiredFiles: ["fallout2.exe", "Fallout2Launcher.exe"],
    setup: prepareForModding,
    environment: {
      SteamAPPId: STEAMAPP_ID,
    },
    details: {
      steamAppId: STEAMAPP_ID,
    },
  });

  context.api.events.on("mod-enabled", async (profileId, modId) => modEnabledCallback(context, profileId, modId));
  context.api.events.on("mod-disabled", async (profileId, modId) => modDisabledCallback(context, profileId, modId));

  return true;
}

export default main;
