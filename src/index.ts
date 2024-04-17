import { fs, log, types, util } from 'vortex-api';
import { DEFAULT_EXECUTABLE, GAME_ID, STEAMAPP_ID } from './common';
import { path } from path;

function main(context: types.IExtensionContext) {
  context.registerGame({
    id: GAME_ID,
    name: "Fallout 2",
    mergeMods: true,
    queryPath: () => {},
    supportedTools: [],
    queryModPath: () => "BloodstainedRotN/Content/Paks/~mods",
    logo: "gameart.jpg",
    executable: () => DEFAULT_EXECUTABLE,
    requiredFiles: [
      'fallout2.exe',
      'Fallout2Launcher.exe',
    ],
    setup: () => {},
    environment: {
      SteamAPPId: STEAMAPP_ID,
    },
    details: {
      steamAppId: STEAMAPP_ID
    },
  });

  return true;
}

export default main;
