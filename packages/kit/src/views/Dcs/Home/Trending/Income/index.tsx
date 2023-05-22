import { useEffect } from 'react';

import { useIsVerticalLayout } from '@onekeyhq/components';

import backgroundApiProxy from '../../../../../background/instance/backgroundApiProxy';
import { useTrendingListContext } from '../context';

import Desktop from './Container/Desktop';
import Mobile from './Container/Mobile';

const DateMap: Record<number, string> = {
  0: 'month',
  1: 'quarter',
  2: 'halfYear',
  3: 'Year',
  4: 'history',
};

const Team = () => {
  const isSmallScreen = useIsVerticalLayout();
  const context = useTrendingListContext()?.context;
  const setContext = useTrendingListContext()?.setContext;
  const { serviceDCS } = backgroundApiProxy;
  useEffect(() => {
    (async () => {
      if (context?.selectedIndex === 0) {
        if (setContext) {
          setContext((ctx) => ({
            ...ctx,
            loading: true,
          }));
          const data = await serviceDCS.fetchRankingInfo({
            net: 97, // context?.selectedNetwork?.id
            page: 1,
            size: context?.isTab ? 5 : 100,
            sortName: '',
            sortOrder: '',
            timeType: DateMap[context?.selectedTime],
            typew: 'income',
          }, 'trending');
          if (data) {
            setContext((ctx) => {
              const { isTab } = ctx;
              return {
                ...ctx,
                incomeList: isTab ? data.slice(0, 5) : data,
                loading: false,
              };
            });
          }
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    context?.selectedNetwork?.id,
    context?.selectedTime,
    serviceDCS,
    setContext,
  ]);

  return isSmallScreen ? (
      <Mobile listData={context?.incomeList ?? []} />
  ) : (
      <Desktop listData={context?.incomeList ?? []} />
  );
};

export default Team;
