import { ConfigService } from './config/config.service';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TesteModule } from './teste/teste.module';
import { join } from 'path';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import * as path from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.database,
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    TesteModule,
    ConfigModule,
    AuthModule,
    UsuarioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
