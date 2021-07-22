import { dbConfig } from 'dbConfig';
import { Request, Response } from 'express';
import { IResumoOP } from 'IResumoOPDTO';
import sql from 'mssql';

class GetResumoOPController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { anoMes } = request.query;
    try {
      const pool = await sql.connect(dbConfig);
      const resumoOP = await pool.request().query(`
        select * FROM
            VW_CUS_RESUMO_OP
          WHERE
            AnoMes='${anoMes}'`);

      const resumoOPList = resumoOP.recordsets[0] as IResumoOP[];
      // const orders = [...resumoOPList];

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

      const ordersGroup = groupBy(resumoOPList, 'ProdOP');

      const ordersKey = Object.keys(ordersGroup).map(prodOpKey => {
        const items = Object.values(ordersGroup[prodOpKey]) as IResumoOP[];
        const product = items.filter(item => item.CF === 'PR')[0];
        const composition = items.filter(item => item.CF !== 'PR');
        Object.assign(product, { composition });
        return product;
      });

      // const mindMap = orders.map(item =>
      //   item.ProdOP === item.Produto
      //     ? {
      //         id: Number(item.ProdOP),
      //         label: `${item.Descricao.substr(0, 10)}`,
      //       }
      //     : {
      //         id: Number(item.Produto),
      //         label: `${item.Descricao.substr(0, 10)}`,
      //         parent: Number(item.ProdOP),
      //       },
      // );
      // return response.status(200).json({ mindMap });
      return response.status(200).json({ ordersKey });
    } catch (error) {
      console.log(error);
    }

    return response.status(400).json({});
  }
}

export { GetResumoOPController };
