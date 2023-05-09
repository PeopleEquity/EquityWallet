import { useEffect } from 'react';

import { useIsVerticalLayout } from '@onekeyhq/components';

import backgroundApiProxy from '../../../../../background/instance/backgroundApiProxy';
import { useWealthListContext } from '../context';

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
  const context = useWealthListContext()?.context;
  const setContext = useWealthListContext()?.setContext;
  const { serviceDCS } = backgroundApiProxy;
  useEffect(() => {
    (async () => {
      if (context?.selectedIndex === 1) {
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
            typew: 'team',
          }, 'wealth');
          if (data) {
            setContext((ctx) => {
              const { isTab } = ctx;
              return {
                ...ctx,
                teamList: isTab ? data.slice(0, 5) : data,
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
    <Mobile listData={context?.teamList ?? []} />
  ) : (
    <Desktop listData={context?.teamList ?? []} />
  );
};

export default Team;
