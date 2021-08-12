import { dbConfig } from 'dbConfig';
import { IAccounting } from 'dto/IAccountingDTO';
import { Request, Response } from 'express';
import sql from 'mssql';

class AccountingController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { anoMes } = request.query;
    try {
      const pool = await sql.connect(dbConfig);
      const accounting = await pool.request().query(`
        select * FROM VW_CUS_MV_CONTABIL_CTA_IT_CC WHERE AnoMes='${anoMes}'`);

      const accountingList = accounting.recordsets[0] as IAccounting[];

      const groupBy = (list, property) => {
        return list.reduce((acc, obj) => {
          const key = obj[property];
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(obj);
          return acc;
        }, {});
      };

      const accountingGroup = groupBy(accountingList, 'CC');

      const accountingByCC = Object.keys(accountingGroup).map(CCKey => {
        const accounts = Object.values(accountingGroup[CCKey]) as IAccounting[];
        const totalCCCredit = accounts.reduce((acc, obj) => {
          return acc + obj.Creditos;
        }, 0);
        const totalCCDebit = accounts.reduce((acc, obj) => {
          return acc + obj.Debitos;
        }, 0);

        const accountsFormatted = accounts.map(account => {
          return {
            Conta: account.Conta,
            Item: account.Item,
            Creditos: account.Creditos,
            Debitos: account.Debitos,
            Movimento: account.Movimento,
          };
        });

        return {
          AnoMes: accountingGroup[CCKey][0].AnoMes,
          CentroDeCusto: CCKey,
          Creditos: totalCCCredit,
          Debitos: totalCCDebit,
          MovimentoCC: totalCCCredit - totalCCDebit,
          DetalheContas: accountsFormatted,
        };
      });

      return response
        .status(200)
        .json({ accountingByCC, accountingList, accountingGroup });
    } catch (error) {
      console.log(error);
    }

    return response.status(400).json({});
  }
}

export { AccountingController };
