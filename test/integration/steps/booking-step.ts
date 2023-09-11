import { Given, When, Then, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { expect } from 'chai';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../../src/app.module';

let app;
let response;

Given(
  'a POST BOOKING request is made to {string} with the following data:',
  async (url: string, table) => {
    const testData = table.rowsHash();
    const payload = {
      propertyId: testData.propertyId,
      numberOfGuests: testData.numberOfGuests,
      checkInDate: testData.checkInDate,
      checkOutDate: testData.checkOutDate,
    };
    response = await request(app.getHttpServer()).post(url).send(payload);
  },
);

Given(
  'a POST request is made to {string} with no data:',
  async (url: string) => {
    response = await request(app.getHttpServer()).post(url).send();
  },
);

Then(
  'the create response status code should be {int}',
  (statusCode: number) => {
    expect(response.status).to.equal(statusCode);
  },
);

BeforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  app = moduleFixture.createNestApplication();
  await app.init();
});

AfterAll(async () => {
  await app.close();
});
