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
  WaterSectionhWrapper,
  WaterGraphWrapper,
  Overflow,
  ScrollerWrapper,
  HeaderData,
} from './WaterGraph.styled';
import { useEffect, useState } from 'react';
import { getStats } from '../../../redux/statistics/statisticOperations';
import { useDispatch, useSelector } from 'react-redux';
import { selectInfo } from '../../../redux/statistics/statisticSelectors';

export const WaterGraph = ({ dateRange }) => {
  const [waterIntake, setWaterIntake] = useState([]);

  const info = useSelector(selectInfo);

  useEffect(() => {
    if (info && Array.isArray(info)) {
      setWaterIntake(info);
    }
  }, [info]);

  const numberOfDaysInTheMonth = (date) => {
    let monthNumberTested;

    if (date !== new Date().getMonth()) {
      monthNumberTested = new Date().getDate();
    } else {
      monthNumberTested = new Date(2023, date, 0).getDate();
    }
    const daysArray = Array.from({ length: monthNumberTested }, (_, index) =>
      (index + 1).toString()
    );
    return daysArray;
  };

  const labels = numberOfDaysInTheMonth(dateRange);
  console.log('Labels:', labels);

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

  // Использование среднего значения в коде
  const avgWater = averageWater();
  console.log('Average Water Consumption:', avgWater);

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
    <WaterSectionhWrapper>
      <WaterHeadingWrapper>
        <WaterHeader>Water</WaterHeader>
        {avgWater ? (
          <HeaderData>
            <WaterAverageTitle>Average value:</WaterAverageTitle>
            <WaterAverageNumber>{avgWater.toFixed(0)} ml</WaterAverageNumber>
          </HeaderData>
        ) : (
          <HeaderData>
            <WaterAverageTitle>Average value:</WaterAverageTitle>
            <WaterAverageNumber>no added data yet</WaterAverageNumber>
          </HeaderData>
        )}
      </WaterHeadingWrapper>
      <ScrollerWrapper>
        <Overflow>
          <WaterGraphWrapper>
            <Line options={options} data={data}></Line>
          </WaterGraphWrapper>
        </Overflow>
      </ScrollerWrapper>
    </WaterSectionhWrapper>
  );
};
