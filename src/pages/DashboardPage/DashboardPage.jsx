import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import StyledDatepicker from '../../components/StyledDatepicker/StyledDatepicker';
import { WaterGraph } from '../../components/Charts/WaterGraph/WaterGraph';
import { CaloriesGraph } from '../../components/Charts/CaloriesGraph/CaloriesGraph';
import { WeightGraph } from '../../components/Charts/WeightGraph/WeightGraph';

import {
  DashboardSection,
  DashboardContainer,
  HeaderBlock,
  MainHeaderBlock,
  SecondHeader,
  LineChartBlock,
  ChartGrid,
  ScaleChartBlock,
} from './DashboardPage.styled';
import BackLink from '../../components/BackLink';
import { startOfMonth, endOfMonth, format } from 'date-fns';

const DashboardPage = () => {
  const [date, setDate] = useState(null);

  const getCurrentMonthDateRange = () => {
    const today = new Date();
    const startDate = startOfMonth(today);
    const endDate = endOfMonth(today);

    return {
      dateFrom: format(startDate, 'yyyy-MM-dd'),
      dateTo: format(endDate, 'yyyy-MM-dd'),
    };
  };

  useEffect(() => {
    const todayDateRange = getCurrentMonthDateRange();
    console.log('Current Month Date Range:', todayDateRange);
  }, []);

  return (
    <DashboardSection>
      <DashboardContainer>
        <HeaderBlock>
          <MainHeaderBlock>
            <BackLink />
            <StyledDatepicker />
          </MainHeaderBlock>
          <SecondHeader></SecondHeader>
        </HeaderBlock>
        <LineChartBlock>
          <ChartGrid>
            <CaloriesGraph date={date} setDate={setDate} />
          </ChartGrid>
          <ChartGrid>
            <WaterGraph dateRange={getCurrentMonthDateRange()} />
          </ChartGrid>
        </LineChartBlock>
        <ScaleChartBlock>
          <WeightGraph date={date} setDate={setDate} />
        </ScaleChartBlock>
      </DashboardContainer>
    </DashboardSection>
  );
};

export default DashboardPage;
