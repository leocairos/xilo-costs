import { dbConfig } from 'dbConfig';
import { IOrderSummary } from 'dto/IOrderSummaryDTO';
import { Request, Response } from 'express';
import sql from 'mssql';

class OrderSummaryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { anoMes } = request.query;
    try {
      const pool = await sql.connect(dbConfig);
      const resumoOP = await pool.request().query(`
        select * FROM
            VW_CUS_RESUMO_OP
          WHERE
            AnoMes='${anoMes}'`);

      const resumoOPList = resumoOP.recordsets[0] as IOrderSummary[];

      // const groupBy = (list, property) => {
      //   return list.reduce((acc, obj) => {
      //     const key = obj[property];
      //     if (!acc[key]) {
      //       acc[key] = [];
      //     }
      //     acc[key].push(obj);
      //     return acc;
      //   }, {});
      // };

      // const ordersGroup = groupBy([...resumoOPList], 'ProdOP');

      // const ordersKey = Object.keys(ordersGroup).map(prodOpKey => {
      //   const items = Object.values(ordersGroup[prodOpKey]) as IOrderSummary[];
      //   const product = items.filter(item => item.CF === 'PR')[0];
      //   const composition = items
      //     .filter(item => item.CF !== 'PR')
      //     .map(item => ({
      //       TM: item.TM,
      //       CF: item.CF,
      //       Produto: item.Produto,
      //       Descricao: item.Descricao,
      //       Tipo: item.Tipo,
      //       Qtde: item.Qtde,
      //       CustUnit: item.CustUnit,
      //       CustoTotal: item.CustoTotal,
      //       Material: item.Material,
      //       MaoDeObra: item.MaoDeObra,
      //       GGF: item.GGF,
      //     }));
      //   Object.assign(product, { composition });
      //   return product;
      // });

      return response.status(200).json({ resumoOPList });
      // return response.status(200).json({ ordersKey });
    } catch (error) {
      throw new Error(error);
    }
  }
}

export { OrderSummaryController };
