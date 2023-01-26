import React, { useMemo, useState } from 'react'

import SelectInput from '../../components/SelectInput'
import ContentHeader from '../../components/ContentHeader'
import WalletBox from '../../components/WalletBox'
import MessageBox from '../../components/Messagebox'

import expenses from '../../repositories/expenses'
import gains from '../../repositories/gains'
import listOfMonths from '../../utils/months'

import happy from '../../assets/happy.svg'
import sad from '../../assets/sad.svg'
import grinning from '../../assets/grinning.svg'


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

  const totalExpenses = useMemo(() => {
    
    let  total: number = 0;
    
    expenses.forEach(item => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if(month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount)
        } catch (error) {
          throw new Error('Invalid amount. Amount must be number.')
        }
      }
    })
    return total
  },[monthSelected, yearSelected])

  const totalGains = useMemo(() => {
    
    let  total: number = 0;
    
    gains.forEach(item => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if(month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount)
        } catch (error) {
          throw new Error('Invalid amount. Amount must be number.')
        }
      }
    })
    return total
  },[monthSelected, yearSelected])

  const totalBalance = useMemo(() => {
    return totalGains - totalExpenses
  }, [totalExpenses, totalGains ])

  const message = useMemo(() => {
    if(totalBalance < 0) {
      return {
      title: 'Que tristeza!',
        description: 'Nesse mês, você gastou mais do que deveria.',
        footerText: 'Verifique seus gastos e tente cortar algumas despesas desnecessárias.',
        icon: sad
      }
    }
    else if(totalBalance === 0) {
      return {
        title: 'Ufaa!',
        description: 'Nesse mês, você gastou exatamente o que ganhou.',
        footerText: 'No próximo mês tente cortar algumas despesas desnecessárias.',
        icon: grinning
      }
    }
    else {
      return {
        title: 'Muito bem!',
        description: 'Sua carteira está positiva!',
        footerText: 'Continue assim. Considere investir o seu saldo.',
        icon: happy
      }
    }
  },[totalBalance])

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
            amount={totalBalance}
            footerlabel = "atualizado com base nas entradas e saídas"
            icon='dolar'
          />
           <WalletBox
            color='#F7931B'
            title='entradas'
            amount={totalGains}
            footerlabel = "atualizado com base nas entradas e saídas"
            icon='arrowUp'
          />
           <WalletBox
            color='#E44C4E'
            title='saídas'
            amount={totalExpenses}
            footerlabel = "atualizado com base nas entradas e saídas"
            icon='arrowDown'
          />
          <MessageBox 
            title= {message.title}
            description= {message.description}
            footerText= {message.footerText}
            icon= {message.icon}
          />
        </Content>
    </Container>
  )
}

export default Dashboard