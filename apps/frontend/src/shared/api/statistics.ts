import { Model } from '@slavseat/types';

import { axiosInstance } from './axiosInstance';

export function getRecentDailyReserveStatistics() {
  return axiosInstance
    .get<Model.DailyStatistics[]>('/api/statistics/reserve/daily', {
      params: {
        start: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
        end: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      },
    })
    .then((res) => res.data)
    .then((data) => data.map((statistic) => ({ ...statistic, date: new Date(statistic.date) })));
}

export function getRecentDailyReserveTransactionStatistics() {
  return axiosInstance
    .get<Model.DailyStatistics[]>('/api/statistics/reserve-transaction/daily', {
      params: {
        start: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
        end: new Date(),
      },
    })
    .then((res) => res.data)
    .then((data) => data.map((statistic) => ({ ...statistic, date: new Date(statistic.date) })));
}
