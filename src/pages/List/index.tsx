import React from 'react'

import { Container } from './styles'
import ContentHeader from '../../components/ContentHeader'
import SelectInput from '../../components/SelectInput'

const List = () => {
  const option = [
    {value: 'Ricardo', label: 'Ricardo'},
    {value: 'Dayse', label: 'Dayse'},
    {value: 'Letícia', label: 'Letícia'}
  ];

  return (
    <Container>
        <ContentHeader title='Saídas' lineColor='#E44C4E'>
          <SelectInput options={option}/>
        </ContentHeader>
    </Container>
  )
}

export default List