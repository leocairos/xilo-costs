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
      // const orders = [...resumoOPList];

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

      // const ordersGroup = groupBy(resumoOPList, 'ProdOP');

      // const ordersKey = Object.keys(ordersGroup).map(prodOpKey => {
      //   const items = Object.values(ordersGroup[prodOpKey]) as IOrderSummary[];
      //   const product = items.filter(item => item.CF === 'PR')[0];
      //   const composition = items.filter(item => item.CF !== 'PR');
      //   Object.assign(product, { composition });
      //   return product;
      // });

      const elementsFlow = resumoOPList.map(item => ({
        id: item.Produto,
        data: { label: `${item.Descricao}` },
        position: { x: 0, y: 0 },
      }));
      const edgeFlow = resumoOPList
        .filter(item => ['PA', 'PI', 'MP'].includes(item.Tipo))
        .map(item => ({
          id: `${item.Produto} to ${item.ProdOP}`,
          source: item.Produto,
          target: item.ProdOP,
          animated: true,
          type: 'smoothstep',
        }));
      return response
        .status(200)
        .json({ resumoOPList, elementsFlow, edgeFlow });
      // return response.status(200).json({ ordersKey });
    } catch (error) {
      console.log(error);
    }

    return response.status(400).json({});
  }
}

export { OrderSummaryController };
