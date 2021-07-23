import { dbConfig } from 'dbConfig';
import { IFactor } from 'dto/IFactorDTO';
import { Request, Response } from 'express';
import sql from 'mssql';

class FactorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { anoMes } = request.query;
    try {
      const pool = await sql.connect(dbConfig);
      const factors = await pool.request().query(`
        select * FROM VW_CUS_CONF_FATOR WHERE AnoMes='${anoMes}'`);

      const factorsList = factors.recordsets[0].map(item => {
        return {
          ...item,
          HorasDeProducao: item.Qtde * item.Fator,
        };
      }) as IFactor[];

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

      const factorGroup = groupBy(factorsList, 'CC');

      const factorsByCC = Object.keys(factorGroup).map(CCKey => {
        const products = Object.values(factorGroup[CCKey]) as IFactor[];
        const totalCCHours = products.reduce((acc, obj) => {
          return acc + obj.HorasDeProducao;
        }, 0);

        const productsFormatted = products.map(prod => {
          return {
            Produto: prod.Produto,
            Qtde: prod.Qtde,
            Fator: prod.Fator,
            HorasProducao: prod.HorasDeProducao,
            percentAbsorcao: prod.HorasDeProducao / totalCCHours,
          };
        });

        return {
          AnoMes: factorGroup[CCKey][0].AnoMes,
          CentroDeCusto: CCKey,
          totalCCHours,
          products: productsFormatted,
        };
      });

      return response.status(200).json({ factorsByCC, factorGroup });
    } catch (error) {
      console.log(error);
    }

    return response.status(400).json({});
  }
}

export { FactorController };
