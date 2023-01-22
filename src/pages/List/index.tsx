import React, { useMemo } from 'react'

import { Container, Content, Filters } from './styles'
import ContentHeader from '../../components/ContentHeader'
import SelectInput from '../../components/SelectInput'
import HistoryFinanceCard from '../../components/HistoryFinanceCard'
import { useParams } from 'react-router-dom'

const List: React.FC = () => {
  const {type} = useParams()

  const title = useMemo(() => {
    return type=== 'entry-balance' ? 'Entradas' : 'Saídas'
  }, [type])
    

  const lineColor = useMemo(() => {
    return type=== 'entry-balance' ? '#F7931B' : '#E44C4E'
  }, [type])

  const months = [
    {value: 1, label:'janeiro'}, 
    {value: 2, label:'fevereiro'},
    {value: 3, label:'março'}, 
    {value: 4, label:'abril'},
    {value: 5, label:'maio'}, 
    {value: 6, label:'junho'},
    {value: 7, label:'julho'}, 
    {value: 8, label:'agosto'},
    {value: 9, label:'setembro'}, 
    {value: 10, label:'outubro'},
    {value: 11, label:'novembro'}, 
    {value: 12, label:'dezembro'},
  ]

  const years = [
    {value:2023, label: 2023},
    {value:2022, label: 2022},
    {value:2021, label: 2021},
    {value:2020, label: 2020},
  ]

  return (
    <Container>
        <ContentHeader title={title} lineColor={lineColor}>
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