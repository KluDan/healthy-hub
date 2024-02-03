import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {
  WaterAverageNumber,
  WaterAverageTitle,
  WaterHeader,
  WaterHeadingWrapper,
  WaterSectionWrapper,
  WaterGraphWrapper,
  Overflow,
  ScrollerWrapper,
  HeaderData,
} from './WaterGraph.styled';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectInfo } from '../../../redux/statistics/statisticSelectors';

export const WaterGraph = ({ dateRange }) => {
  const [waterIntake, seWaterIntake] = useState([]);
  const statsInfo = useSelector(selectInfo);

  useEffect(() => {
    if (statsInfo && Array.isArray(statsInfo)) {
      seWaterIntake(statsInfo);
    } else {
      seWaterIntake([]);
    }
  }, [statsInfo]);

  let daysArray = [];
  if (dateRange !== null) {
    const startDateString = dateRange.substring(0, 10);
    const endDateString = dateRange.substring(10);

    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);

    daysArray = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      daysArray.push(currentDate.getDate().toString());
      currentDate.setDate(currentDate.getDate() + 1);
    }
  } else {
    console.log('DateRange is null.');
  }

  const labels = daysArray;

  console.log('WaterIntake', waterIntake);
  const waterIntakeArray = waterIntake.map((item) => item.stats.waterIntake);
  console.log('WaterIntakeArray', waterIntakeArray);

  const initialWaterIntakeData = labels.map((day) => ({ day, value: 0 }));
  console.log('InitialWaterIntakeData', initialWaterIntakeData);

  const waterIntakeData = waterIntake.reduce((result, item) => {
    const day = new Date(item.date).getDate().toString();
    result.push({ day, value: item.stats.waterIntake });
    return result;
  }, []);

  console.log('WaterIntakeData', waterIntakeData);

  const combinedWaterIntakeData = initialWaterIntakeData.map((initialItem) => {
    const matchingItem = waterIntakeData.find(
      (item) => item.day === initialItem.day
    );

    if (matchingItem) {
      return matchingItem;
    } else {
      return initialItem;
    }
  });

  console.log('CombinedWaterIntakeData', combinedWaterIntakeData);

  const maxNumber = Math.max(...waterIntakeArray);
  console.log(maxNumber);

  const arrayOfGraphData = () => {
    return combinedWaterIntakeData.map((item) => item.value);
  };

  const maxOnGraph = () => {
    const defaultMinimum = 3000;
    if (maxNumber < defaultMinimum) {
      return defaultMinimum;
    }
    const roundedNumber = Math.ceil(maxNumber / 1000) * 1000;
    return roundedNumber;
  };

  const averageWater = () => {
    const totalWater = combinedWaterIntakeData.reduce(
      (sum, item) => sum + item.value,
      0
    );

    return totalWater / combinedWaterIntakeData.length;
  };

  const avgWater = averageWater();
  console.log('Average Water Consumption:', avgWater);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: maxOnGraph(),
        grid: {
          color: '#292928',
        },
        gridLines: {
          display: false,
          color: '#B6B6B6',
        },
        ticks: {
          stepSize: 1000,
          color: '#B6B6B6',
          callback: function (value) {
            if (String(value).length === 1) {
              return value;
            }
            return String(value / 1000) + `L`;
          },
        },
      },
      x: {
        grid: {
          color: '#292928',
        },
        ticks: {
          color: '#B6B6B6',
        },
        scales: {
          x: {
            min: 0,
            max: 100,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        cornerRadius: 8,
        caretSize: 0,
        padding: 10,
        borderColor: 'rgba(227, 255, 168, 0.1)',
        borderWidth: 3,
        backgroundColor: '#0f0f0f',
        titleFont: {
          weight: 'bold',
          size: 32,
          color: 'white',
        },
        displayColors: false,
        yAlign: 'bottom',
        xAlign: 'auto',
        bodyFont: {
          size: 32,
        },
        footerFont: {
          size: 16,
        },
        footerAlign: 'center',
        labelAlign: 'center',
        callbacks: {
          title: () => null,
          label: (context) => context.raw,
          footer: () => 'milliliters',
        },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Water',
        fill: false,
        showLine: true,
        borderColor: '#e3ffa8',
        borderWidth: 1,
        tension: 0.4,
        pointRadius: 0,
        pointBorderColor: '#e3ffa8',
        pointHoverRadius: 3,
        pointHitRadius: 12,
        pointBackgroundColor: '#e3ffa8',
        data: arrayOfGraphData(),
      },
    ],
  };

  return (
    <WaterSectionWrapper>
      <WaterHeadingWrapper>
        <WaterHeader>Water</WaterHeader>
        <HeaderData>
          <WaterAverageTitle>Average value:</WaterAverageTitle>
          <WaterAverageNumber>
            {avgWater ? `${avgWater.toFixed(0)} ml` : '0 ml'}
          </WaterAverageNumber>
        </HeaderData>
      </WaterHeadingWrapper>
      <ScrollerWrapper>
        <Overflow>
          <WaterGraphWrapper>
            <Line options={options} data={data}></Line>
          </WaterGraphWrapper>
        </Overflow>
      </ScrollerWrapper>
    </WaterSectionWrapper>
  );
};
