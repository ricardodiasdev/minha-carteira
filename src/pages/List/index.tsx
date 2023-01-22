import React from 'react'

import { Container, Content, Filters } from './styles'
import ContentHeader from '../../components/ContentHeader'
import SelectInput from '../../components/SelectInput'
import HistoryFinanceCard from '../../components/HistoryFinanceCard'

const List = () => {
  const months = [
    {value: 1, label: 'Janeiro'},
    {value: 2, label: 'Fevereiro'},
    {value: 3, label: 'Março'}
  ];

  const years = [
    {value: 2023, label: 2023},
    {value: 2022, label: 2022},
    {value: 2021, label: 2021}
  ];

  return (
    <Container>
        <ContentHeader title='Saídas' lineColor='#E44C4E'>
          <SelectInput options={months}/>
          <SelectInput options={years}/>
        </ContentHeader>
        <Filters>
          <button type='button' className='tag-filter tag-filter-recurrent'>
            Recorrentes
          </button>
          <button type='button' className='tag-filter tag-filter-eventual'>
            Eventuais
          </button>
        </Filters>
        <Content>
          <HistoryFinanceCard
            tagColor='#E44C4E'
            title='Conta de luz'
            subtitle='27/07/2022'
            amount='R$ 130,00'
          />
        </Content>
    </Container>
  )
}

export default List