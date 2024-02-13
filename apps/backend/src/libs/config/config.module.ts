import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { Region } from 'oci-common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV !== 'test' ? '.env' : '.env.test',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .required(),
        PORT: Joi.number().default(3001),
        COOKIE_DOMAIN: Joi.string().required(),
        AUTH_HOST: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_DB: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
        OCI_STORAGE_NAMESPACE: Joi.string().required(),
        OCI_STORAGE_PUBLIC_BUCKET: Joi.string().required(),
        OCI_STORAGE_PRIVATE_BUCKET: Joi.string().required(),
        OCI_TENANCY: Joi.string().required(),
        OCI_USER: Joi.string().required(),
        OCI_FINGERPRINT: Joi.string().required(),
        OCI_PRIVATEKEY: Joi.string()
          .required()
          .custom((value) => {
            return (value as string).replace(/\\n/g, '\n');
          }),
        OCI_REGION: Joi.string()
          .required()
          .custom((value, helpers) => {
            if (Region.fromRegionId(value) === undefined)
              return helpers.message({
                custom: 'Region Code is wrong',
              });
            return value;
          }),
      }),
    }),
  ],
})
export class ConfigurationModule {}
