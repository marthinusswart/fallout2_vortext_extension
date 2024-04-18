import path from "path";
import { fs, log, types, util } from "vortex-api";
import { DEFAULT_EXECUTABLE, GAME_ID, STEAMAPP_ID } from "./common";

const supportedFiles = ["ARTEMPLE.cfg", "artemple.map", "KLADWTWN.MAP", "KLADWTWN.txt"];

export async function validateSupportedContent(files, gameId): Promise<types.ISupportedResult> {
  let supported = gameId === GAME_ID;
  log("info", "validating, gameId: " + gameId + " GAME_ID: " + GAME_ID);

  files.forEach((file) => {
    log("info", "File: " + file);
    if (supportedFiles.includes(file) && supported) {
      supported = true;
      log("info", "Supported: " + file);
    } else {
      supported = false;
      log("info", "Not Supported: " + file);
    }
  });

  log("info", "IsSupported: " + supported);

  return { supported, requiredFiles: [] };
}

export function installContent(files) {
  /*
  const modFile = files.find((file) => path.extname(file).toLowerCase() === MOD_FILE_EXT);
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
*/
  //return Promise.resolve({ instructions });
  return true;
}
