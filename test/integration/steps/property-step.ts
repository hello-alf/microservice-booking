import { Given, When, Then, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { expect } from 'chai';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../../src/app.module';

let app;
let response;

Given(
  'a POST request is made to {string} with the following data:',
  async (url: string, table) => {
    const testData = table.rowsHash();
    const payload = {
      name: testData.name,
      pricePerNight: testData.pricePerNight,
    };
    response = await request(app.getHttpServer()).post(url).send(payload);
  },
);

When('a GET request is made to {string}', async function (url: string) {
  response = await request(app.getHttpServer()).get(url);
});

Then('the response status code should be {int}', (statusCode: number) => {
  expect(response.status).to.equal(statusCode);
});

Then('the response should contain {string}', (expectedText: string) => {
  expect(response.text).to.include(expectedText);
});

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
