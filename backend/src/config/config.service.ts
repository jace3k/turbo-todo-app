import { TypeOrmModuleOptions } from "@nestjs/typeorm";


require('dotenv').config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) { }

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env: ${key}`);
    }

    return value || "";
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode == 'PROD';
  }

  public isTest() {
    const mode = this.getValue('MODE', false);
    return mode == 'TEST';
  }

  public isDevInMemory() {
    const mode = this.getValue('MODE', false);
    return mode == 'IN_MEMORY';
  }

  private getTestConfig(): TypeOrmModuleOptions {
    return {
      type: 'better-sqlite3',
      database: ':memory:',
      // logging: true,
      synchronize: true,
      entities: ['src/**/*.entity{.js,.ts}'],
      migrationsTableName: 'migration',
      migrations: ['src/migration/*{.js,.ts}'],
      cli: {
        migrationsDir: 'src/migration'
      },
    }
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    if (this.isTest())
      return this.getTestConfig();

    if (this.isDevInMemory())
      return {
        ...this.getTestConfig(),
        entities: ['dist/src/**/*.entity{.js,.ts}'],
        migrations: ['dist/src/migration/*{.js,.ts}'],
      }

    return {
      type: 'postgres',
      logging: false,
      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),

      entities: ['dist/src/**/*.entity.js'],
      migrationsTableName: 'migration',
      migrations: ['dist/src/migration/*{.js,.ts}'],
      cli: {
        migrationsDir: 'src/migration'
      },
      ssl: this.isProduction(),

      // sync db models instead of using migrations
      synchronize: false,
    }
  }
}

const configService = new ConfigService(process.env)
  .ensureValues([
    'POSTGRES_HOST',
    'POSTGRES_PORT',
    'POSTGRES_USER',
    'POSTGRES_PASSWORD',
    'POSTGRES_DATABASE'
  ])

export { configService }
