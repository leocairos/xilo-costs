import { dbConfig } from 'dbConfig';
import { Request, Response } from 'express';
import sql from 'mssql';

function formattedItem(item, level) {
  const result = {
    // level,
    // ProdOP: item.ProdOP,
    // DescricaoProdOP: item.DescricaoProdOP,
    // CC: item.CC,
    // DescricaoCC: item.DescricaoCC,
    phase: `${item.CC} ${item.DescricaoCC}`,
    productionOf: `${item.ProdOP} ${item.DescricaoProdOP}`,
    component: `${item.Produto} ${item.Descricao}`,
    // AnoMes: item.AnoMes,
    // TM: item.TM,
    CF: item.CF,
    // Produto: item.Produto,
    // Descricao: item.Descricao,
    Tipo: item.Tipo,
    Qtde: item.Qtde,
    CustoTotal: item.CustoTotal,
    CustoUnit: item.CustUnit,
    cmTon: (item.CustoTotal / item.Qtde) * 1000,
    components: item.components,
  };
  if (item.CF === 'PR') delete result.component;
  else delete result.productionOf;
  return result;
}

function structProducts(products, component?, level = 1) {
  const node =
    level > 1
      ? []
      : products
          .filter(item => item.ProdOP === component && item.CF === 'PR')
          .map(it => formattedItem(it, level));

  if (level === 1) node[0].components = [];
  const items = [];
  const filtered = products.filter(item => {
    return item.ProdOP === component && item.CF !== 'PR';
  });

  filtered.forEach(item => {
    const comp = item;
    if (!['PA', 'PI', 'MP'].includes(comp.Tipo)) {
      items.push(formattedItem(comp, level));
      return null;
    }
    comp.components = structProducts(products, comp.Produto, level + 1);
    if (level === 1) return node[0].components.push(formattedItem(comp, level));
    return node.push(formattedItem(comp, level));
  });

  const compDirect = products
    .filter(
      item =>
        item.ProdOP === component &&
        item.CF !== 'PR' &&
        !['PA', 'PI', 'MP'].includes(item.Tipo),
    )
    .map(it => formattedItem(it, level));

  if (level === 1) node[0].components.push(...compDirect);
  else node[0]?.components?.push(...items);

  return node;
}

async function opSummary(anoMes, idProduct): Promise<any> {
  try {
    const pool = await sql.connect(dbConfig);
    const resumoOP = await pool.request().query(`
      select * FROM
          VW_CUS_RESUMO_OP_v3
        WHERE
          AnoMes='${anoMes}'`);

    const productStructOrder = structProducts(
      resumoOP.recordsets[0],
      idProduct,
    );

    return {
      productStructOrder,
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
  }
}

export { OrderSummaryControllerV2 };
