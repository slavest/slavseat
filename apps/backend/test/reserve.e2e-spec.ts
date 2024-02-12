import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

describe('/reserve API', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({}).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });
});
