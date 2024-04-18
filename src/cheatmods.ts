import path from "path";
import { fs, log, selectors, types, util } from "vortex-api";
import { DEFAULT_EXECUTABLE, GAME_ID, STEAMAPP_ID } from "./common";

const supportedFiles = ["ARTEMPLE.cfg", "artemple.map", "KLADWTWN.MAP", "KLADWTWN.txt"];

export async function enableCheatChestMod(context: types.IExtensionContext, modId: string) {
  const api = context.api;
  const game = await util.GameStoreHelper.findByAppId([STEAMAPP_ID]);
  const gamePath = game.gamePath;
  const state = api.getState();
  const staging = selectors.installPathForGame(state, GAME_ID);

  let srcArtempleCfgFullpath = path.join(staging, modId);
  srcArtempleCfgFullpath = path.join(srcArtempleCfgFullpath, "ARTEMPLE.cfg");
  let tgtArtempleCfgFullpath = path.join(gamePath, "data\\maps");
  tgtArtempleCfgFullpath = path.join(tgtArtempleCfgFullpath, "ARTEMPLE.cfg");

  let srcArtempleMapFullpath = path.join(staging, modId);
  srcArtempleMapFullpath = path.join(srcArtempleMapFullpath, "artemple.map");
  let tgtArtempleMapFullpath = path.join(gamePath, "data\\maps");
  tgtArtempleMapFullpath = path.join(tgtArtempleMapFullpath, "artemple.map");

  fs.linkSync(srcArtempleCfgFullpath, tgtArtempleCfgFullpath);
  fs.linkSync(srcArtempleMapFullpath, tgtArtempleMapFullpath);
}

export async function enableStartChestMod(context: types.IExtensionContext, modId: string) {
  const api = context.api;
  const game = await util.GameStoreHelper.findByAppId([STEAMAPP_ID]);
  const gamePath = game.gamePath;
  const state = api.getState();
  const staging = selectors.installPathForGame(state, GAME_ID);

  let srcKLADWTWNTxtFullpath = path.join(staging, modId);
  srcKLADWTWNTxtFullpath = path.join(srcKLADWTWNTxtFullpath, "Fallout 2 Start Chest");
  srcKLADWTWNTxtFullpath = path.join(srcKLADWTWNTxtFullpath, "KLADWTWN.txt");
  let tgtKLADWTWNTxtFullpath = path.join(gamePath, "data\\maps");
  tgtKLADWTWNTxtFullpath = path.join(tgtKLADWTWNTxtFullpath, "KLADWTWN.txt");

  let srcKLADWTWNMapFullpath = path.join(staging, modId);
  srcKLADWTWNMapFullpath = path.join(srcKLADWTWNMapFullpath, "Fallout 2 Start Chest");
  srcKLADWTWNMapFullpath = path.join(srcKLADWTWNMapFullpath, "KLADWTWN.MAP");
  let tgtKLADWTWNMapFullpath = path.join(gamePath, "data\\maps");
  tgtKLADWTWNMapFullpath = path.join(tgtKLADWTWNMapFullpath, "KLADWTWN.MAP");

  fs.linkSync(srcKLADWTWNTxtFullpath, tgtKLADWTWNTxtFullpath);
  fs.linkSync(srcKLADWTWNMapFullpath, tgtKLADWTWNMapFullpath);
}

export async function disableCheatChestMod(context: types.IExtensionContext, modId: string) {
  const api = context.api;
  const game = await util.GameStoreHelper.findByAppId([STEAMAPP_ID]);
  const gamePath = game.gamePath;
  const state = api.getState();
  const staging = selectors.installPathForGame(state, GAME_ID);

  let tgtArtempleCfgFullpath = path.join(gamePath, "data\\maps");
  tgtArtempleCfgFullpath = path.join(tgtArtempleCfgFullpath, "ARTEMPLE.cfg");

  let tgtArtempleMapFullpath = path.join(gamePath, "data\\maps");
  tgtArtempleMapFullpath = path.join(tgtArtempleMapFullpath, "artemple.map");

  fs.removeSync(tgtArtempleCfgFullpath);
  fs.removeSync(tgtArtempleMapFullpath);
}

export async function disableStartChestMod(context: types.IExtensionContext, modId: string) {
  const game = await util.GameStoreHelper.findByAppId([STEAMAPP_ID]);
  const gamePath = game.gamePath;

  let tgtKLADWTWNTxtFullpath = path.join(gamePath, "data\\maps");
  tgtKLADWTWNTxtFullpath = path.join(tgtKLADWTWNTxtFullpath, "KLADWTWN.txt");

  let tgtKLADWTWNMapFullpath = path.join(gamePath, "data\\maps");
  tgtKLADWTWNMapFullpath = path.join(tgtKLADWTWNMapFullpath, "KLADWTWN.MAP");

  fs.removeSync(tgtKLADWTWNTxtFullpath);
  fs.removeSync(tgtKLADWTWNMapFullpath);
}

export async function validateSupportedContent(files, gameId): Promise<types.ISupportedResult> {
  const supported = gameId === GAME_ID;
  log("info", "validating, gameId: " + gameId + " GAME_ID: " + GAME_ID);
  return { supported: false, requiredFiles: [] };
}

export async function installContent(files) {
  alert("Checking installed files");

  const modFile = files.find((file) => path.extname(file).toLowerCase() === ".MAP");
  const idx = modFile.indexOf(path.basename(modFile));
  const rootPath = path.dirname(modFile);

  // Remove directories and anything that isn't in the rootPath.
  const filtered = files.filter((file) => file.indexOf(rootPath) !== -1 && !file.endsWith(path.sep));

  const instructions = filtered.map((file) => {
    return {
      type: "copy",
      source: file,
      destination: path.join(file.substr(idx)),
    };
  });

  return { instructions };
}
