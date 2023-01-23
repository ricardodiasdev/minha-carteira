import React, { useMemo, useState, useEffect } from "react";

import { Container, Content, Filters } from "./styles";
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";
import { useParams } from "react-router-dom";

import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";
import formatCurrency from "../../utils/formatCurrency"
import formatDate from "../../utils/formatDate";

interface IData {
  id: string,
  description: string;
  amountFormatted: string;
  frequency: string;
  dataFormatted: string;
  tagColor: string;
}

const List: React.FC = () => {


  const [data, setData] = useState<IData[]>([]);
  const [monthSelected, setMonthSelected] = useState<string>(String(new Date().getMonth() + 1))
  const [yearSelected, setYearSelected] = useState<string>(String(new Date().getFullYear()))


  const { type } = useParams();

  const title = useMemo(() => {
    return type === "entry-balance" ? "Entradas" : "Saídas";
  }, [type]);

  const lineColor = useMemo(() => {
    return type === "entry-balance" ? "#F7931B" : "#E44C4E";
  }, [type]);

  const listData =  useMemo(() => {
    return type === 'entry-balance' ? gains : expenses;
  },[type])

  const months = [
    { value: 1, label: "janeiro" },
    { value: 2, label: "fevereiro" },
    { value: 3, label: "março" },
    { value: 4, label: "abril" },
    { value: 5, label: "maio" },
    { value: 6, label: "junho" },
    { value: 7, label: "julho" },
    { value: 8, label: "agosto" },
    { value: 9, label: "setembro" },
    { value: 10, label: "outubro" },
    { value: 11, label: "novembro" },
    { value: 12, label: "dezembro" },
  ];

  const years = [
    { value: 2023, label: 2023 },
    { value: 2022, label: 2022 },
    { value: 2021, label: 2021 },
    { value: 2020, label: 2020 },
  ];

  useEffect(() => {
    const filterDate = listData.filter((item) => {
      const date = new Date(item.date)
      const month = String(date.getMonth() + 1)
      const year = String(date.getFullYear())
      return month === monthSelected && year === yearSelected
    })
    const formattedData =  filterDate.map(item => {

      return {
        id: String(Math.random() * filterDate.length),
        description: item.description,
        amountFormatted: formatCurrency(Number(item.amount)),
        frequency: item.frequency,
        dataFormatted: formatDate(item.date),
        tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E',
      }
    })
    setData(formattedData)
    
  },[monthSelected, yearSelected, data.length, listData])

  return (
    <Container>
      <ContentHeader title={title} lineColor={lineColor}>
        <SelectInput 
          options={months} 
          onChange={e => setMonthSelected(e.target.value)}
          defaultValue={monthSelected}
        />
        <SelectInput 
          options={years} 
          onChange={e => setYearSelected(e.target.value)}
          defaultValue={yearSelected}
        />
      </ContentHeader>
      <Filters>
        <button type="button" className="tag-filter tag-filter-recurrent">
          Recorrentes
        </button>
        <button type="button" className="tag-filter tag-filter-eventual">
          Eventuais
        </button>
      </Filters>
      <Content>
        {
          data.map(item => (
            <HistoryFinanceCard
              key={item.id}
              tagColor={item.tagColor}
              title={item.description}
              subtitle={item.dataFormatted}
              amount={item.amountFormatted}
            />

          ))
        }
      </Content>
    </Container>
  );
};

export default List;
