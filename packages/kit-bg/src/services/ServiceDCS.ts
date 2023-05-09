/* eslint-disable @typescript-eslint/require-await */
import {
  backgroundClass,
  backgroundMethod,
} from '@onekeyhq/shared/src/background/backgroundDecorators';

import ServiceBase from './ServiceBase';
import {TokenAsset} from "@onekeyhq/engine/src/types/dcs";

@backgroundClass()
class ServicDCS extends ServiceBase {
  get baseUrl() {
    return `https://www.equityswap.club`;
  }

  @backgroundMethod()
  async fetchRankingInfo(params: {
    net: number
    page: number;
    size: number;
    sortName: string;
    sortOrder: string;
    timeType: string;
    typew: string;
  }, type: string) {
    const apiUrl = `${this.baseUrl}/app/index/${type}`;
    const { data, success } = await this.client
        .post(apiUrl, params)
        .then((resp) => {
          if (resp?.data?.code === 0) {
            return {
              success: true,
              data: resp.data.datas.list
            }
          }
          throw new Error('fetch error')
        })
        .catch(() => ({
          success: false,
          data: { total: 0, next: undefined, content: [] as TokenAsset[] },
        }));
    if (!success) {
      return undefined;
    }
    return data;
  }
}

export default ServicDCS;
