/* eslint-disable no-restricted-syntax */
import { dbConfig } from 'dbConfig';
import { IOrderSummary } from 'dto/IOrderSummaryDTO';
import { Request, Response } from 'express';
import sql from 'mssql';

function structProducts(products, component?) {
  const node = [];
  const material = [];
  products
    .filter(item => {
      return item.ProdOP === component && item.CF !== 'PR';
    })
    .forEach(d => {
      const comp = d;
      if (!['PA', 'PI', 'MP'].includes(d.Tipo)) {
        material.push(comp);
        return null;
      }
      comp.components = structProducts(products, d.Produto);
      return node.push(comp);
    });
  node[0]?.components?.push(...material);
  return node;
}

async function allProductsList(anoMes): Promise<any> {
  try {
    const pool = await sql.connect(dbConfig);
    const productsQuery = await pool.request().query(`
      select distinct ProdOP FROM
          VW_CUS_RESUMO_OP_v2
        WHERE
          AnoMes='${anoMes}' and CF='PR'`);

    const allProducts = productsQuery.recordsets[0].map(item => item.ProdOP);
    return allProducts;
  } catch (error) {
    throw new Error(error);
  }
}

async function opSummary(anoMes, idProduct): Promise<any> {
  try {
    const pool = await sql.connect(dbConfig);
    const resumoOP = await pool.request().query(`
      select * FROM
          VW_CUS_RESUMO_OP_v2
        WHERE
          AnoMes='${anoMes}'`);

    // const allSummaryOrders = resumoOP.recordsets[0] as IOrderSummary[];

    // AllProducts
    // const idsProducts = (await allProductsList(anoMes)) as string[];
    // console.log(idsProducts);
    // const productStructOrder = idsProducts.map(prod =>
    //   structProducts(resumoOP.recordsets[0], prod),
    // );
    const productStructOrder = structProducts(
      resumoOP.recordsets[0],
      idProduct,
    );

    /* const groupBy = (list, property) => {
      return list.reduce((acc, obj) => {
        const key = obj[property];
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
      }, {});
    }; */

    // const ordersGroupByProduct = groupBy(resumoOP.recordsets[0], 'ProdOP');
    // const ordersGroupByCC = groupBy(resumoOP.recordsets[0], 'CC');
    return {
      productStructOrder,
      /* allSummaryOrders,
      ordersGroupByProduct,
      ordersGroupByCC, */
    };
  } catch (error) {
    throw new Error(error);
  }
}
class OrderSummaryControllerV2 {
  async handle(request: Request, response: Response): Promise<Response> {
    const { anoMes, idProduct } = request.query;

    const result = await opSummary(anoMes, idProduct);
    return response.status(200).json(result);
    // try {
    //   const pool = await sql.connect(dbConfig);
    //   const resumoOP = await pool.request().query(`
    //     select * FROM
    //         VW_CUS_RESUMO_OP_v2
    //       WHERE
    //         AnoMes='${anoMes}'`);

    //   const resumoOPList = resumoOP.recordsets[0] as IOrderSummary[];

    //   const structProducts = (products, component?) => {
    //     const node = [];
    //     const material = [];
    //     products
    //       .filter(item => {
    //         return item.ProdOP === component && item.CF !== 'PR';
    //       })
    //       .forEach(d => {
    //         const comp = d;
    //         if (!['PA', 'PI', 'MP'].includes(d.Tipo)) {
    //           material.push(comp);
    //           return null;
    //         }
    //         comp.components = structProducts(products, d.Produto);
    //         return node.push(comp);
    //       });
    //     node[0]?.components?.push(...material);
    //     return node;
    //   };

    //   const results = structProducts(resumoOP.recordsets[0], idProduct);

    //   const groupBy = (list, property) => {
    //     return list.reduce((acc, obj) => {
    //       const key = obj[property];
    //       if (!acc[key]) {
    //         acc[key] = [];
    //       }
    //       acc[key].push(obj);
    //       return acc;
    //     }, {});
    //   };

    //   const ordersGroup = groupBy(resumoOP.recordsets[0], 'ProdOP');
    //   return response.status(200).json({
    //     results,
    //     resumoOPList,
    //     ordersGroup,
    //   });
    // } catch (error) {
    //   throw new Error(error);
    // }
  }

  async handleFuncionando(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { anoMes, idProduct } = request.query;
    try {
      const pool = await sql.connect(dbConfig);
      const resumoOP = await pool.request().query(`
        select * FROM
            VW_CUS_RESUMO_OP_v2
          WHERE
            AnoMes='${anoMes}'`);

      const resumoOPList = resumoOP.recordsets[0] as IOrderSummary[];

      const structProducts = (products, component?) => {
        const node = [];
        const material = [];
        products
          .filter(item => {
            return item.ProdOP === component && item.CF !== 'PR';
          })
          .forEach(d => {
            const comp = d;
            if (!['PA', 'PI', 'MP'].includes(d.Tipo)) {
              material.push(comp);
              return null;
            }
            comp.components = structProducts(products, d.Produto);
            return node.push(comp);
          });
        node[0]?.components?.push(...material);
        return node;
      };

      const results = structProducts(resumoOP.recordsets[0], idProduct);

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

      const ordersGroup = groupBy(resumoOP.recordsets[0], 'ProdOP');
      return response.status(200).json({
        results,
        resumoOPList,
        ordersGroup,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async handle3(request: Request, response: Response): Promise<Response> {
    const { anoMes, idProduct } = request.query;
    try {
      const pool = await sql.connect(dbConfig);
      const resumoOP = await pool.request().query(`
        select * FROM
            VW_CUS_RESUMO_OP_v2
          WHERE
            AnoMes='${anoMes}'`);

      const resumoOPList = resumoOP.recordsets[0] as IOrderSummary[];

      const structProducts = (products, Produto) => {
        const node = [];
        const material = [];

        products
          .filter(d => {
            return d.ProdOP === Produto && d.CF !== 'PR';
          })
          // .filter(d => {
          //   return ['PA', 'PI', 'MP'].includes(d.Tipo);
          // })
          .forEach(d => {
            const cd = d;
            if (!['PA', 'PI', 'MP'].includes(d.Tipo)) {
              material.push(cd);
            } else {
              if (['PA', 'PI', 'MP'].includes(d.Tipo))
                cd.components = structProducts(products, d.Produto);
              return node.push(cd);
            }
          });
        node[0]?.components?.push(...material);
        return node;
      };

      const results = structProducts(resumoOPList, idProduct);

      return response.status(200).json({
        results,
        resumoOPList,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async handle2(request: Request, response: Response): Promise<Response> {
    const { anoMes, idProduct } = request.query;
    try {
      const pool = await sql.connect(dbConfig);
      const resumoOP = await pool.request().query(`
        select * FROM
            VW_CUS_RESUMO_OP_v2
          WHERE
            AnoMes='${anoMes}'`);

      const resumoOPList = resumoOP.recordsets[0] as IOrderSummary[];

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
        CentroCusto: item.CC,
        composition: item.composition
          .filter(itemC => !['CUSTOS-GGF', 'CUSTOS-MO'].includes(itemC.Produto))
          .filter(itemC2 => ['PA', 'PI', 'MP'].includes(itemC2.Tipo))
          .map(itemComp => ({
            // CF: itemComp.CF,
            Componente: itemComp.Produto,
            Descricao: itemComp.Descricao,
            CentroCusto: itemComp.CC,
          })),
      }));

      const products = [];

      resume.forEach(it => {
        if (it.composition.length > 0) {
          it.composition.forEach(cp => {
            products.push({
              Produto: it.Produto,
              Descricao: it.Descricao,
              CentroCusto: it.CentroCusto,
              Componente: cp.Componente,
              // DescComp: cp.Descricao,
              // CC_Componente: cp.CentroCusto,
            });
          });
        } else {
          products.push({
            Produto: it.Produto,
            Descricao: it.Descricao,
            CentroCusto: it.CentroCusto,
            // Componente: null,
            // DescComp: null,
            // CC_Componente: null,
          });
        }
      });

      // const compare = (a, b) => {
      //   // Use toUpperCase() to ignore character casing
      //   const produtoA = a.Produto?.toUpperCase();
      //   const produtoB = b.Produto?.toUpperCase();

      //   let comparison = 0;
      //   if (produtoA > produtoB) {
      //     comparison = 1;
      //   } else if (produtoA < produtoB) {
      //     comparison = -1;
      //   }
      //   return comparison;
      // };

      // products.sort(compare);

      // const runX = 0;
      const structProducts = (products, Produto) => {
        const node = [];
        products
          .filter(d => {
            return d.Produto === Produto;
          })
          .forEach(d => {
            // runX++;
            // if (runX >= 30) return;
            const cd = d;
            cd.components = structProducts(products, d.Componente);
            delete cd.Componente;
            delete cd.DescComp;
            return node.push(cd);
          });
        return node;
      };

      const results = structProducts(products, idProduct);

      return response.status(200).json({
        results,
        resume,
        products,
        ordersSummary: ordersKey,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}

export { OrderSummaryControllerV2 };
