import { dbConfig } from 'dbConfig';
import { IIndirect } from 'dto/IIndirectDTO';
import { Request, Response } from 'express';
import sql from 'mssql';

class IndirectController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { anoMes } = request.query;
    try {
      const pool = await sql.connect(dbConfig);
      const indirect = await pool.request().query(`
        select * FROM VW_CUS_RATEIO_INDIRETOS WHERE AnoMes='${anoMes}'`);

      const indirectList = indirect.recordsets[0] as IIndirect[];

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

      const indirectGroup = groupBy(indirectList, 'ccCredito');

      const apportionmentByCC = Object.keys(indirectGroup).map(CCKey => {
        const apportionments = Object.values(
          indirectGroup[CCKey],
        ) as IIndirect[];
        const totalAmmountIndirect = apportionments.reduce((acc, obj) => {
          return acc + obj.Valor;
        }, 0);

        const ccDirects = apportionments.map(item => {
          return {
            CC_Direto: item.ccDebito,
            CC_Direto_Name: item.CC_Debito,
            Total_Recebido: item.Valor,
            percentInd: item.Valor / totalAmmountIndirect,
          };
        });

        return {
          AnoMes: indirectGroup[CCKey][0].AnoMes,
          CC_Indireto: CCKey,
          CC_Indireto_Name: indirectGroup[CCKey][0].CC_Credito,
          totalAmmountIndirect,
          ccDirects,
        };
      });

      return response
        .status(200)
        .json({ apportionmentByCC, apportionments: indirectList });
    } catch (error) {
      console.log(error);
    }

    return response.status(400).json({});
  }
}

export { IndirectController };
