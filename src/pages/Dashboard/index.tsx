import React from 'react'

import SelectInput from '../../components/SelectInput'

import ContentHeader from '../../components/ContentHeader'

import { Container } from './styles'

const Dashboard = () => {

  const option = [
    {value: 'Ricardo', label: 'Ricardo'},
    {value: 'Dayse', label: 'Dayse'},
    {value: 'Letícia', label: 'Letícia'}
  ];
  return (
    <Container>
        <ContentHeader title='Dashboard' lineColor='#fff'>
          <SelectInput options={option}/>
        </ContentHeader>
    </Container>
  )
}

export default Dashboard