import {
  WeightBlock,
  WeightTitleBlock,
  WeightGraphBlock,
} from './WeightGraph.styled';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { selectInfo } from '../../../redux/statistics/statisticSelectors';

export const WeightGraph = ({ dateRange }) => {
  const [stats, setStats] = useState([]);
  const statsInfo = useSelector(selectInfo);

  useEffect(() => {
    if (statsInfo && Array.isArray(statsInfo)) {
      setStats(statsInfo);
    } else {
      setStats([]);
    }
  }, [statsInfo]);

  console.log('Weight', stats);

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

  const currentWeightArray = stats.map((item) => item.stats.weight);
  const initialData = daysArray.map((day) => ({ day, value: 0 }));
  const weightData = stats.reduce((result, item) => {
    const day = new Date(item.date).getDate().toString();
    result.push({ day, value: item.stats.weight });
    return result;
  }, []);
  const combineWeightData = initialData.map((initialItem) => {
    const matchingItem = weightData.find(
      (item) => item.day === initialItem.day
    );

    if (matchingItem) {
      return matchingItem;
    } else {
      return initialItem;
    }
  });

  const arrayOfGraphData = () => {
    return combineWeightData.map((item) => item.value);
  };
  const arraydata = arrayOfGraphData();

  console.log('arraydata', arraydata);

  const averageWeight = () => {
    const totalWeight = combineWeightData.reduce(
      (sum, item) => sum + item.value,
      0
    );

    return totalWeight / combineWeightData.length;
  };

  const avgWeight = averageWeight();

  return (
    <WeightBlock>
      <WeightTitleBlock>
        <h2>Weight</h2>
        <p>
          Average value:<span>{avgWeight}kg</span>
        </p>
      </WeightTitleBlock>
      <WeightGraphBlock>
        <ul>
          {arraydata.map((value, index) => (
            <li key={index}>
              <span>{value}</span>
              <span>{index + 1}</span>
            </li>
          ))}
        </ul>
      </WeightGraphBlock>
    </WeightBlock>
  );
};
