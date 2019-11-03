import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';
import * as fs from 'fs';
import { join } from 'path';

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  get port(): number {
    return Number(this.envConfig.PORT);
  }

  get database(): any {
    return {
      type: process.env[this.envConfig.TYPEORM_CONNECTION] || this.envConfig.TYPEORM_CONNECTION,
      host: process.env[this.envConfig.TYPEORM_HOST] || this.envConfig.TYPEORM_HOST,
      port: process.env[this.envConfig.TYPEORM_PORT] || this.envConfig.TYPEORM_PORT,
      username: process.env[this.envConfig.TYPEORM_USERNAME] || this.envConfig.TYPEORM_USERNAME,
      password: process.env[this.envConfig.TYPEORM_PASSWORD] || this.envConfig.TYPEORM_PASSWORD,
      database: process.env[this.envConfig.TYPEORM_DATABASE] || this.envConfig.TYPEORM_DATABASE,
      synchronize: false,
      cli: {
        migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
      },
      entities: [
        join(__dirname, '/../**/**.entity{.ts,.js}'),
      ],
    };
  }

  get secret(): string {
    return process.env[this.envConfig.SECRET] || this.envConfig.SECRET;
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'production')
        .default('development'),
      PORT: Joi.number().default(3000),
      TYPEORM_CONNECTION: Joi.string().required(),
      TYPEORM_HOST: Joi.string().required(),
      TYPEORM_PORT: Joi.number().required(),
      TYPEORM_USERNAME: Joi.string().required(),
      TYPEORM_PASSWORD: Joi.string().required(),
      TYPEORM_DATABASE: Joi.string().required(),
      TYPEORM_MIGRATIONS: Joi.string().required(),
      TYPEORM_MIGRATIONS_DIR: Joi.string().required(),
      SECRET: Joi.string().required(),
    });

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(
      envConfig,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }
}
