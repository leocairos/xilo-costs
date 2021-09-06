import { dbConfig } from 'dbConfig';
import { IOrderSummary } from 'dto/IOrderSummaryDTO';
import { Request, Response } from 'express';
import sql from 'mssql';

class OrderSummaryControllerV2 {
  async handle(request: Request, response: Response): Promise<Response> {
    const { anoMes } = request.query;
    try {
      const pool = await sql.connect(dbConfig);
      const resumoOP = await pool.request().query(`
        select * FROM
            VW_CUS_RESUMO_OP_v2
          WHERE
            AnoMes='${anoMes}'`);

      const resumoOPList = resumoOP.recordsets[0] as IOrderSummary[];

      // const orders = resumoOPList as IOrderSummary[];
      // const MOandGGF = orders
      //   .filter(item => ['CUSTOS-GGF', 'CUSTOS-MO'].includes(item.Produto))
      //   .map(item => ({
      //     ProdOP: item.ProdOP,
      //     Produto: item.Produto,
      //     CustoTotal: item.CustoTotal,
      //   }));

      // const material = orders
      //   .filter(item => !['CUSTOS-GGF', 'CUSTOS-MO'].includes(item.Produto))
      //   .filter(item => !['PA', 'PI', 'MP'].includes(item.Tipo))
      //   .map(item => ({
      //     ProdOP: item.ProdOP,
      //     Produto: item.Produto,
      //     CustoTotal: item.CustoTotal,
      //   }));

      // const elementsFlow = orders
      //   .filter(item => ['PA', 'PI', 'MP'].includes(item.Tipo))
      //   .map(item => {
      //     const mo = MOandGGF.filter(
      //       itemMOGGF =>
      //         itemMOGGF.ProdOP === item.ProdOP &&
      //         itemMOGGF.Produto === 'CUSTOS-MO',
      //     );
      //     const ggf = MOandGGF.filter(
      //       itemMOGGF =>
      //         itemMOGGF.ProdOP === item.ProdOP &&
      //         itemMOGGF.Produto === 'CUSTOS-GGF',
      //     );
      //     const materialFase = material
      //       .filter(itemMat => itemMat.ProdOP === item.ProdOP)
      //       .reduce((acc, item) => acc + item.CustoTotal, 0);

      //     const detail = orders
      //       .filter(
      //         itemDetail =>
      //           itemDetail.ProdOP === item.ProdOP &&
      //           itemDetail.Produto !== item.ProdOP,
      //       )
      //       .map(item => ({
      //         Produto: item.Produto,
      //         Descricao: item.Descricao,
      //         Qtde: item.Qtde,
      //         CustoTotal: item.CustoTotal,
      //       }));

      //     return {
      //       ...item,
      //       moFase: mo.length > 0 ? mo[0].CustoTotal : 0,
      //       ggfFase: ggf.length > 0 ? ggf[0].CustoTotal : 0,
      //       materialFase,
      //       detail,
      //     };
      //   });
      // .map(item => ({ id: item.Produto }))
      // // remove duplicates
      // .reduce((acc, current) => {
      //   const x = acc.find(item => item.id === current.id);
      //   if (!x) {
      //     return acc.concat([current]);
      //   }
      //   return acc;
      // }, []);

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

      const ordersGroup = groupBy([...resumoOPList], 'ProdOP');

      const ordersKey = Object.keys(ordersGroup).map(prodOpKey => {
        const items = Object.values(ordersGroup[prodOpKey]) as IOrderSummary[];
        const product = items.filter(item => item.CF === 'PR')[0];

        const composition = items
          .filter(item => item.CF !== 'PR')
          .map(item => {
            return {
              TM: item.TM,
              CF: item.CF,
              Produto: item.Produto,
              Descricao: item.Descricao,
              Tipo: item.Tipo,
              Qtde: item.Qtde,
              CustUnit: item.CustUnit,
              CustoTotal: item.CustoTotal,
              Material: item.Material,
              MaoDeObra: item.MaoDeObra,
              GGF: item.GGF,
            };
          });
        Object.assign(product, { composition });
        return product;
      });

      const resume = [...ordersKey].map(item => ({
        Produto: item.ProdOP,
        Descricao: item.Descricao,
        // Produto: item.Produto,
        composition: item.composition
          .filter(itemC => !['CUSTOS-GGF', 'CUSTOS-MO'].includes(itemC.Produto))
          .filter(itemC2 => ['PA', 'PI', 'MP'].includes(itemC2.Tipo))
          .map(itemComp => ({
            // CF: itemComp.CF,
            Componente: itemComp.Produto,
            Descricao: itemComp.Descricao,
          })),
      }));

      const products = [];

      resume.forEach(it => {
        if (it.composition.length > 0) {
          it.composition.forEach(cp => {
            products.push({
              Produto: it.Produto,
              DescProd: it.Descricao,
              Componente: cp.Componente,
              DescComp: cp.Descricao,
            });
          });
        } else {
          products.push({
            Produto: it.Produto,
            DescProd: it.Descricao,
            Componente: null,
            DescComp: null,
          });
        }
      });

      const compare = (a, b) => {
        // Use toUpperCase() to ignore character casing
        const produtoA = a.Produto?.toUpperCase();
        const produtoB = b.Produto?.toUpperCase();

        let comparison = 0;
        if (produtoA > produtoB) {
          comparison = 1;
        } else if (produtoA < produtoB) {
          comparison = -1;
        }
        return comparison;
      };

      products.sort(compare);

      let runX = 0;
      const structProducts = (products, Produto) => {
        const node = [];
        products
          .filter(d => {
            return d.Produto === Produto;
          })
          .forEach(d => {
            runX++;
            if (runX >= 300) return;
            const cd = d;
            cd.child = structProducts(products, d.Componente);
            return node.push(cd);
          });
        return node;
      };

      const results = structProducts(products, products[100].Produto);

      return response.status(200).json({
        results,
        resume,
        products,
        ordersSummary: ordersKey,
      });
      // return response.status(200).json({ ordersKey });
    } catch (error) {
      throw new Error(error);
    }
  }
}

export { OrderSummaryControllerV2 };
