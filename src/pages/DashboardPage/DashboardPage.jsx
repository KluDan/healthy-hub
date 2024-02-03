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
import { getStats } from '../../redux/statistics/statisticOperations';
import { selectInfo } from '../../redux/statistics/statisticSelectors';

const DashboardPage = () => {
  const [date, setDate] = useState(null);
  const [dateRange, setDateRange] = useState(null);
  const dispatch = useDispatch();

  const [stats, setStats] = useState([]);
  const statsInfo = useSelector(selectInfo);
  useEffect(() => {
    if (statsInfo && Array.isArray(statsInfo)) {
      setStats(statsInfo);
    } else {
      setStats([]);
    }
  }, [statsInfo]);

  console.log('СТАТСЫ', stats);

  useEffect(() => {
    const fetchDataAndUpdate = async () => {
      try {
        const data = await dispatch(getStats(dateRange));
        console.log('Received data:', data);
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
            <WaterGraph dateRange={dateRange} />
          </ChartGrid>
        </LineChartBlock>

        <ScaleChartBlock>
          <WeightGraph dateRange={dateRange} />
        </ScaleChartBlock>
      </DashboardContainer>
    </DashboardSection>
  );
};

export default DashboardPage;
