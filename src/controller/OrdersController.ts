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

      const orders = resumoOPList as IOrderSummary[];
      const MOandGGF = orders
        .filter(item => ['CUSTOS-GGF', 'CUSTOS-MO'].includes(item.Produto))
        .map(item => ({
          ProdOP: item.ProdOP,
          Produto: item.Produto,
          CustoTotal: item.CustoTotal,
        }));

      const material = orders
        .filter(item => !['CUSTOS-GGF', 'CUSTOS-MO'].includes(item.Produto))
        .filter(item => !['PA', 'PI', 'MP'].includes(item.Tipo))
        .map(item => ({
          ProdOP: item.ProdOP,
          Produto: item.Produto,
          CustoTotal: item.CustoTotal,
        }));

      const elementsFlow = orders
        .filter(item => ['PA', 'PI', 'MP'].includes(item.Tipo))
        .map(item => {
          const mo = MOandGGF.filter(
            itemMOGGF =>
              itemMOGGF.ProdOP === item.ProdOP &&
              itemMOGGF.Produto === 'CUSTOS-MO',
          );
          const ggf = MOandGGF.filter(
            itemMOGGF =>
              itemMOGGF.ProdOP === item.ProdOP &&
              itemMOGGF.Produto === 'CUSTOS-GGF',
          );
          const materialFase = material
            .filter(itemMat => itemMat.ProdOP === item.ProdOP)
            .reduce((acc, item) => acc + item.CustoTotal, 0);

          const detail = orders
            .filter(
              itemDetail =>
                itemDetail.ProdOP === item.ProdOP &&
                itemDetail.Produto !== item.ProdOP,
            )
            .map(item => ({
              Produto: item.Produto,
              Descricao: item.Descricao,
              Qtde: item.Qtde,
              CustoTotal: item.CustoTotal,
            }));

          return {
            ...item,
            moFase: mo.length > 0 ? mo[0].CustoTotal : 0,
            ggfFase: ggf.length > 0 ? ggf[0].CustoTotal : 0,
            materialFase,
            detail,
          };
        });
      // .map(item => ({ id: item.Produto }))
      // // remove duplicates
      // .reduce((acc, current) => {
      //   const x = acc.find(item => item.id === current.id);
      //   if (!x) {
      //     return acc.concat([current]);
      //   }
      //   return acc;
      // }, []);

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

      return response.status(200).json({ resumoOPList, elementsFlow });
      // return response.status(200).json({ ordersKey });
    } catch (error) {
      throw new Error(error);
    }
  }
}

export { OrderSummaryController };
