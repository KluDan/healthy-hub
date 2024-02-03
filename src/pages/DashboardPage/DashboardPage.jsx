import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
import { getStats } from '../../redux/statistics/statisticOperations';
import { selectInfo } from '../../redux/statistics/statisticSelectors';

const DashboardPage = () => {
  const [date, setDate] = useState(null);
  const [dateRange, setDateRange] = useState(null);
  const dispatch = useDispatch();

  const [waterIntake, setWaterIntake] = useState([]);
  const statsInfo = useSelector(selectInfo);
  console.log('statsInfo', statsInfo);

  useEffect(() => {
    const fetchDataAndUpdate = async () => {
      try {
        await dispatch(getStats(dateRange));
        if (statsInfo && Array.isArray(statsInfo)) {
          setWaterIntake(statsInfo);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (dateRange) {
      fetchDataAndUpdate();
    }
  }, [dispatch, dateRange]);

  return (
    <DashboardSection>
      <DashboardContainer>
        <HeaderBlock>
          <MainHeaderBlock>
            <BackLink />
            <StyledDatepicker onDateRangeChange={setDateRange} />
          </MainHeaderBlock>
          <SecondHeader></SecondHeader>
        </HeaderBlock>
        <LineChartBlock>
          <ChartGrid>
            <CaloriesGraph dateRange={dateRange} />
          </ChartGrid>
          <ChartGrid>
            <WaterGraph dateRange={dateRange} waterIntake={waterIntake} />
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
