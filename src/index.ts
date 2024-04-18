import path from "path";
import { fs, log, types, util } from "vortex-api";
import { installContent, validateSupportedContent } from "./cheatmods";
import { DEFAULT_EXECUTABLE, GAME_ID, STEAMAPP_ID } from "./common";

function findGame() {
  return util.GameStoreHelper.findByAppId([STEAMAPP_ID]).then((game) => game.gamePath);
}

function prepareForModding(discovery) {
  return fs.ensureDirWritableAsync(path.join(discovery.path, "backups"));
}

function main(context: types.IExtensionContext) {
  context.registerGame({
    id: GAME_ID,
    name: "Fallout 2",
    mergeMods: true,
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

  context.registerInstaller("fallout2-cheat-mods", 25, validateSupportedContent as any, installContent);
  //context.registerInstaller("fallout2-cheat-mods", 25, testSupportedContent, installContent2);

  return true;
}

export default main;
