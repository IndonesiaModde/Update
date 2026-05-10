/**
 * Validação centralizada de variáveis de ambiente
 */

interface EnvironmentVariables {
  NODE_ENV: "development" | "production";
  PORT: number;
}

function validateEnvironment(): EnvironmentVariables {
  const nodeEnv = process.env.NODE_ENV || "development";
  const port = parseInt(process.env.PORT || "3000", 10);

  // Validar NODE_ENV
  if (!["development", "production"].includes(nodeEnv)) {
    throw new Error(
      `Invalid NODE_ENV: ${nodeEnv}. Must be 'development' or 'production'`
    );
  }

  // Validar PORT
  if (isNaN(port) || port < 1 || port > 65535) {
    throw new Error(
      `Invalid PORT: ${process.env.PORT}. Must be a number between 1 and 65535`
    );
  }

  return {
    NODE_ENV: nodeEnv as "development" | "production",
    PORT: port,
  };
}

/**
 * Valida as variáveis de ambiente ao iniciar o servidor
 */
export function validateEnvOnStartup(): void {
  try {
    const env = validateEnvironment();
    console.log(`[Environment] NODE_ENV: ${env.NODE_ENV}`);
    console.log(`[Environment] PORT: ${env.PORT}`);
  } catch (error) {
    console.error("[Environment] Validation failed:", error);
    process.exit(1);
  }
}

/**
 * Retorna as variáveis de ambiente validadas
 */
export function getEnvironment(): EnvironmentVariables {
  return validateEnvironment();
}
