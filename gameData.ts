/**
 * Dados de atualização do jogo
 * Estes dados são servidos pelos endpoints /live/{hash} e /fileinfo
 */

export const versionInfo = {
  version: "1.17.1",
  releaseDate: "2026-05-09",
  changelog: "Bug fixes and performance improvements",
};

export const fileInfo = `gameassetbundles,mzZtylZ1fawV5N8D8XikRyF+5mY=,12060,0
main/gameentry,DZlCrLRuzwyuNzUZrh+p0QxJCcI=,2018,0
localization/loc,gWXz0dDNM8MJyFcAFhzbqWWqvrY=,632921,0
ingame/avatarmanager,Tjb+QEzOiGwy+DBpxlLrVBZRphA=,1915,0
config/resconf,ysnx0NubzKPaLVGszrP45y9WQH0=,34896,0
avatar/assetindexer,IbV74Hqrb07rdlrKYQx6JZIhZ5M=,74343,0
avatar/uma_dcs,BSJQtQt6qEeFdLv8gsrVtPDQubo=,14523,0`;

/**
 * Armazena logs de acesso em memória
 * Em produção, considere usar um banco de dados
 */
export interface AccessLog {
  timestamp: string;
  path: string;
  userAgent: string;
  method: string;
  statusCode: number;
}

export const accessLogs: AccessLog[] = [];

/**
 * Adiciona um log de acesso
 */
export function logAccess(
  path: string,
  userAgent: string,
  method: string,
  statusCode: number
): void {
  accessLogs.push({
    timestamp: new Date().toISOString(),
    path,
    userAgent,
    method,
    statusCode,
  });

  // Manter apenas os últimos 1000 logs em memória
  if (accessLogs.length > 1000) {
    accessLogs.shift();
  }

  // Log no console para monitoramento
  console.log(
    `[${new Date().toISOString()}] ${method} ${path} - UA: ${userAgent} - Status: ${statusCode}`
  );
}

/**
 * Retorna os logs de acesso
 */
export function getAccessLogs(): AccessLog[] {
  return accessLogs;
}
