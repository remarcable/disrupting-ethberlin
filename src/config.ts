export type IConfig = {
  bot: { token: string; adminId: string };
  server: { port: number };
  log: { output: string };
};

function initConfig(): IConfig {
  const envs = {
    BOT_TOKEN: process.env.BOT_TOKEN,
    ADMIN_ID: process.env.ADMIN_ID,
    SERVER_PORT: process.env.SERVER_PORT,
    LOGS_OUTPUT: process.env.LOGS_OUTPUT || 'logs.log',
  } as const;

  const requiredEnvsNames = ['BOT_TOKEN', 'ADMIN_ID'] as const;

  requiredEnvsNames.forEach((key: keyof typeof envs) => {
    const value = !!envs[key];
    if (!value) {
      console.error(`❌ Missing env value for ${key}`);
      return process.exit(0);
    }
  });

  const config: IConfig = {
    bot: {
      token: envs.BOT_TOKEN!,
      adminId: envs.ADMIN_ID!,
    },
    server: {
      port: Number(envs.SERVER_PORT) || 3000,
    },
    log: {
      output: envs.LOGS_OUTPUT,
    },
  };

  return config;
}

export const CONFIG: IConfig = initConfig();
