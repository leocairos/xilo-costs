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

      return response.status(200).json({ accountingList });
    } catch (error) {
      console.log(error);
    }

    return response.status(400).json({});
  }
}

export { AccountingController };
