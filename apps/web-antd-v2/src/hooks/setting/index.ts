import type { GlobConfig } from '/#/config';

import { warn } from '/@/utils/log';
import { getAppEnvConfig, isDevMode } from '/@/utils/env';

export const useGlobSetting = (): Readonly<GlobConfig> => {
  const { VITE_GLOB_APP_TITLE, VITE_GLOB_API_URL, VITE_GLOB_APP_SHORT_NAME, VITE_GLOB_API_URL_PREFIX, VITE_GLOB_WEBSOCKET_URL } = getAppEnvConfig();

  if (!/[a-zA-Z\_]*/.test(VITE_GLOB_APP_SHORT_NAME)) {
    warn(`VITE_GLOB_APP_SHORT_NAME Variables can only be characters/underscores, please modify in the environment variables and re-running.`);
  }

  const prodUrlPrefix = VITE_GLOB_API_URL && /https?:\/\//.test(VITE_GLOB_API_URL) ? VITE_GLOB_API_URL : window.location.origin + VITE_GLOB_API_URL;

  // Take global configuration
  const glob: Readonly<GlobConfig> = {
    title: VITE_GLOB_APP_TITLE,
    apiUrl: VITE_GLOB_API_URL,
    shortName: VITE_GLOB_APP_SHORT_NAME,
    urlPrefix: VITE_GLOB_API_URL_PREFIX,
    uploadUrl: VITE_GLOB_API_URL + '/bot/filehandler/Uploader',
    webSocketUrl: VITE_GLOB_WEBSOCKET_URL,
    cipherKey: 'FZ9XfQwkN6HHxRao', // 加密key EY8We DgLK 5GGwQzn
    aMapJsKey: '806fa8fe100ee3da70d681e3c57b9351',
    aMapWebKey: '478d323bdb0278cabf65e4f27d4425d7',
    aMapSecurityJsCode: 'b8abdc738d1fb66a2f72b30f3dfba81d',
    // 本地文件预览
    filePreviewServer: isDevMode() ? 'http://localhost:30090/FileServer' : VITE_GLOB_API_URL + '/FileServer',
    // 大屏应用前端路径
    dataVUrl: isDevMode() ? 'http://localhost:8100/DataV/' : prodUrlPrefix + '/DataV/',
    // 数据报表接口
    reportServer: isDevMode() ? 'http://localhost:30007' : VITE_GLOB_API_URL + '/ReportServer',
    // 报表前端路径
    report: isDevMode() ? 'http://localhost:8200' : VITE_GLOB_API_URL + '/Report',
  };
  return glob as Readonly<GlobConfig>;
};
