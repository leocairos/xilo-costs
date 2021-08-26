import { dbConfig } from 'dbConfig';
import { IBalanceProduct } from 'dto/IBalanceProductDTO';
import { Request, Response } from 'express';
import sql from 'mssql';

class BalanceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { anoMes, type } = request.query;
    try {
      const pool = await sql.connect(dbConfig);
      const balance = await pool.request().query(`
        select * FROM VW_CUS_SALDO_${type}_PROD WHERE AnoMes='${anoMes}'`);

      const balanceList = balance.recordsets[0] as IBalanceProduct[];

      const balanceResult =
        type === 'INI'
          ? { SaldoInicial: balanceList }
          : { SaldoFinal: balanceList };
      return response.status(200).json(balanceResult);
    } catch (error) {
      console.log(error);
    }

    return response.status(400).json({});
  }

  async handleLast(request: Request, response: Response): Promise<Response> {
    try {
      const pool = await sql.connect(dbConfig);
      const lastClosed = await pool.request().query(`
        select TOP 12 AnoMes FROM VW_CUS_SALDO_FINAL_PROD
        group by AnoMes
        order by AnoMes desc
        `);

      const lastAll = await pool.request().query(`
        select TOP 12 AnoMes FROM VW_CUS_RESUMO_OP
        group by AnoMes
        order by AnoMes desc
        `);

      const lastClosedPeriods = lastClosed.recordsets[0].map(
        item => item.AnoMes,
      );
      const lastAllPeriods = lastAll.recordsets[0].map(item => item.AnoMes);
      return response.status(200).json({ lastClosedPeriods, lastAllPeriods });
    } catch (error) {
      console.log(error);
    }

    return response.status(400).json({});
  }
}

export { BalanceController };
