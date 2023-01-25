import React, { useMemo, useState } from 'react'

import SelectInput from '../../components/SelectInput'
import ContentHeader from '../../components/ContentHeader'
import WalletBox from '../../components/WalletBox'

import expenses from '../../repositories/expenses'
import gains from '../../repositories/gains'
import listOfMonths from '../../utils/months'


import { Container, Content } from './styles'

const Dashboard: React.FC = () => {
  
  const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
  const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());
  
  const years = useMemo(() => {
    let uniqueYears: number[] = [];
    [...expenses, ...gains].forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();

      if (!uniqueYears.includes(year)) {
        uniqueYears.push(year);
        uniqueYears.sort();
        setYearSelected(year);
      }
    });

    return uniqueYears.map((year) => {
      return {
        value: year,
        label: year,
      };
    });
  }, []);

  const months = useMemo(() => {
    return listOfMonths.map((month, index) => {
      return {
        value: index + 1,
        label: month,
      };
    });
  }, []);

  return (
    <Container>
        <ContentHeader title='Dashboard' lineColor='#F7931B'>
          <SelectInput
            options={months}
            onChange={(e) => setMonthSelected(Number(e.target.value))}
            defaultValue={monthSelected}
          />
          <SelectInput
            options={years}
            onChange={(e) => setYearSelected(Number(e.target.value))}
            defaultValue={yearSelected}
          />
        </ContentHeader>
        <Content>
          <WalletBox
            color='#4E41F0'
            title='saldo'
            amount={150.00}
            footerlabel = "atualizado com base nas entradas e saídas"
            icon='dolar'
          />
           <WalletBox
            color='#F7931B'
            title='entradas'
            amount={5000.00}
            footerlabel = "atualizado com base nas entradas e saídas"
            icon='arrowUp'
          />
           <WalletBox
            color='#E44C4E'
            title='saídas'
            amount={4850.00}
            footerlabel = "atualizado com base nas entradas e saídas"
            icon='arrowDown'
          />
        </Content>
    </Container>
  )
}

export default Dashboard