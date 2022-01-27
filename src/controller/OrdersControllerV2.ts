import { dbConfig } from 'dbConfig';
import { Request, Response } from 'express';
import sql from 'mssql';

function formattedItem(item, level) {
  const quantity = ['MO', 'GG'].includes(item.Tipo)
    ? item.parentQuantity
    : item.Qtde;
  const unitaryCost = item.CustoTotal / quantity;
  const result = {
    level,
    ProdOP: item.ProdOP,
    // DescricaoProdOP: item.DescricaoProdOP,
    // CC: item.CC,
    // DescricaoCC: item.DescricaoCC,
    phase: `${item.CC} ${item.DescricaoCC}`,
    productionOf: `${item.ProdOP} ${item.DescricaoProdOP}`,
    component: `${item.Produto} ${item.Descricao}`,
    // AnoMes: item.AnoMes,
    // TM: item.TM,
    // CF: item.CF,
    // Produto: item.Produto,
    // Descricao: item.Descricao,
    // Tipo: item.Tipo,
    Qtde: quantity,
    CustoTotal: item.CustoTotal,
    CustoUnit: unitaryCost,
    cmTon: (item.CustoTotal / quantity) * 1000,
    parentQuantity: item.parentQuantity,
    parentCustoTotal: item.parentCustoTotal,
    // parentcmTon: item.parentcmTon,
    qtdeCompParaProduzir1TonPai: item.qtdeCompParaProduzir1TonPai,
    costProductionParentTon: item.costProductionParentTon,
    components: item.components,
  };
  if (item.CF === 'PR') delete result.component;
  else delete result.productionOf;
  return result;
}

function structProducts(
  products,
  component?,
  level = 1,
  parentQuantity = 0,
  parentCustoTotal = 0,
) {
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

  const nodeParent = products.filter(
    item => item.ProdOP === component && item.CF === 'PR',
  )[0];

  filtered.forEach(item => {
    const comp = item;
    comp.parentQuantity = level > 1 ? parentQuantity : nodeParent.Qtde;

    const quantity = ['MO', 'GG'].includes(comp.Tipo)
      ? comp.parentQuantity
      : comp.Qtde;
    const unitaryCost = comp.CustoTotal / quantity;

    comp.parentCustoTotal =
      level > 1 ? parentCustoTotal : nodeParent.CustoTotal;

    const auxQuantLevel =
      level >= 1
        ? (comp.Qtde * 1000) / comp.parentQuantity
        : (comp.Qtde * 1000) / comp.qtdeCompParaProduzir1TonPai;

    comp.qtdeCompParaProduzir1TonPai = ['MO', 'GG'].includes(comp.Tipo)
      ? 1000
      : //  : auxQuantLevel;
        (comp.Qtde * 1000) / comp.parentQuantity;

    comp.costProductionParentTon =
      comp.qtdeCompParaProduzir1TonPai * unitaryCost;
    if (!['PA', 'PI', 'MP'].includes(comp.Tipo)) {
      items.push(formattedItem(comp, level));
      return null;
    }
    comp.components = structProducts(
      products,
      comp.Produto,
      level + 1,
      comp.Qtde,
      comp.CustoTotal,
    );
    if (level === 1) return node[0].components.push(formattedItem(comp, level));
    return node.push(formattedItem(comp, level));
  });

  // const compDirect = products
  //   .filter(
  //     item =>
  //       item.ProdOP === component &&
  //       item.CF !== 'PR' &&
  //       !['PA', 'PI', 'MP'].includes(item.Tipo),
  //   )
  //   .map(it => {
  //     Object.assign(it, {
  //       parentQuantity,
  //       parentCustoTotal,
  //       qtdeCompParaProduzir1TonPai: (it.Qtde * 1000) / parentQuantity,
  //     });

  //     return formattedItem(it, level);
  //   });

  // if (level === 1) node[0].components.push(...compDirect);
  // else node[0]?.components?.push(...items);
  node[0]?.components?.push(...items);

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
