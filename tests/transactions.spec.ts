import req from 'supertest';
import { it, beforeAll, afterAll, describe, expect, beforeEach } from 'vitest';
import { execSync } from 'node:child_process';
import { app } from '../src/app';

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all');
    execSync('npm run knex migrate:latest');
  });

  it('Should be able to create a new transaction.', async () => {
        await req(app.server)
        .post('/transactions')
        .send({
            title: 'New Transaction',
            amount: 1000,
            type: 'credit',
        })
        .expect(201);
  });

  it('Should be able to list all transactions', async () => {
        const createTransactionResponse = await req(app.server)
        .post('/transactions')
        .send({
            title: 'New Transaction',
            amount: 1000,
            type: 'credit',
        });

        const cookies: string[] = createTransactionResponse.get('Set-Cookie') || [];

        const listTransactionsResponse = await req(app.server)
        .get('/transactions')
        .set('Cookie', cookies)
        .expect(200);
        
        expect(listTransactionsResponse.body.total).toBe(listTransactionsResponse.body.transactions.length);
        expect(listTransactionsResponse.body.transactions).toEqual([
        expect.objectContaining({
            title: 'New Transaction',
            amount: 1000,
        }),
        ]);
    });

  it('Should be able to get a specific transaction', async () => {
        const createTransactionResponse = await req(app.server)
        .post('/transactions')
        .send({
            title: 'New Transaction',
            amount: 1000,
            type: 'credit',
        });

        const cookies: string[] = createTransactionResponse.get('Set-Cookie') || [];

        const listTransactionsResponse = await req(app.server)
        .get('/transactions')
        .set('Cookie', cookies)
        .expect(200);

        const transactionId = listTransactionsResponse.body.transactions[0].id;

        const getTransactionResponse = await req(app.server)
        .get(`/transactions/${transactionId}`)
        .set('Cookie', cookies)
        .expect(200);

        expect(getTransactionResponse.body.transaction).toEqual(
        expect.objectContaining({
            title: 'New Transaction',
            amount: 1000,
        }));
    });

    it('Should be able to get summary', async () => {
        const createTransactionResponse = await req(app.server)
        .post('/transactions')
        .send({
            title: 'New Transaction',
            amount: 1000,
            type: 'credit',
        });

        const cookies: string[] = createTransactionResponse.get('Set-Cookie') || [];

        await req(app.server)
        .post('/transactions')
        .set('Cookie', cookies)
        .send({
            title: 'Debit transaction',
            amount: 200,
            type: 'debit',
        });

        const summaryResponse = await req(app.server)
        .get('/transactions/summary')
        .set('Cookie', cookies)
        .expect(200);
        console.log(summaryResponse.body);
        

        expect(summaryResponse.body).toEqual({
            amount: 800
        });
    });
});
