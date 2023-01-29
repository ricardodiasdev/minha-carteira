import React, { useMemo, useState } from "react";

import SelectInput from "../../components/SelectInput";
import ContentHeader from "../../components/ContentHeader";
import WalletBox from "../../components/WalletBox";
import MessageBox from "../../components/Messagebox";
import PieChartBox from "../../components/PieChartBox";
import HistoryBox from "../../components/HistoryBox";

import expenses from "../../repositories/expenses";
import gains from "../../repositories/gains";
import listOfMonths from "../../utils/months";

import happy from "../../assets/happy.svg";
import sad from "../../assets/sad.svg";
import grinning from "../../assets/grinning.svg";



import { Container, Content } from "./styles";
import BarChartBox from "../../components/BarChartBox";

const Dashboard: React.FC = () => {
  const [monthSelected, setMonthSelected] = useState<number>(
    new Date().getMonth() + 1
  );

  const [yearSelected, setYearSelected] = useState<number>(
    new Date().getFullYear()
  );

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
    let total: number = 0;

    expenses.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount);
        } catch (error) {
          throw new Error("Invalid amount. Amount must be number.");
        }
      }
    });
    return total;
  }, [monthSelected, yearSelected]);

  const totalGains = useMemo(() => {
    let total: number = 0;

    gains.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount);
        } catch (error) {
          throw new Error("Invalid amount. Amount must be number.");
        }
      }
    });
    return total;
  }, [monthSelected, yearSelected]);

  const totalBalance = useMemo(() => {
    return totalGains - totalExpenses;
  }, [totalExpenses, totalGains]);

  const message = useMemo(() => {
    if (totalGains === 0 && totalExpenses === 0) {
      return {
        title: "Que coisa!",
        description: "Nesse mês, você não ganhou nada, mas também não gastou!",
        footerText:
          "Verifique se você alimentou a sua planilha de ganhos e gastos.",
        icon: grinning,
      };
    } else if (totalBalance < 0) {
      return {
        title: "Que tristeza!",
        description: "Nesse mês, você gastou mais do que deveria.",
        footerText:
          "Verifique seus gastos e tente cortar algumas despesas desnecessárias.",
        icon: sad,
      };
    } else if (totalBalance === 0) {
      return {
        title: "Ufaa!",
        description: "Nesse mês, você gastou exatamente o que ganhou.",
        footerText:
          "No próximo mês tente cortar algumas despesas desnecessárias.",
        icon: grinning,
      };
    } else {
      return {
        title: "Muito bem!",
        description: "Sua carteira está positiva!",
        footerText: "Continue assim. Considere investir o seu saldo.",
        icon: happy,
      };
    }
  }, [totalBalance, totalExpenses, totalGains]);

  const relationExpensesVersusGains = useMemo(() => {
    const total: number = totalGains + totalExpenses;
    const percentGains = (totalGains / total) * 100;
    const percentExpenses = (totalExpenses / total) * 100;
    const data = [
      {
        name: "Entradas",
        value: totalGains,
        percent: total !== 0 ? Number(percentGains.toFixed(1)) : 0,
        color: "#F7931B",
      },
      {
        name: "Saídas",
        value: totalExpenses,
        percent: total !== 0 ? Number(percentExpenses.toFixed(1)) : 0,
        color: "#E44C4E",
      },
    ];
    return data;
  }, [totalGains, totalExpenses]);

  const relationExpensesRecurrentVersusEventual = useMemo(() => {
    let amountRecurrent:number = 0
    let amountEventual:number = 0

    expenses
    .filter((expense) => {
      const date = new Date(expense.date)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      return month === monthSelected && year === yearSelected

    })
    .forEach((expense) =>{
      if(expense.frequency === 'recorrente'){
        return amountRecurrent += Number(expense.amount)
      }

      if(expense.frequency === 'eventual'){
        return amountEventual += Number(expense.amount)
      }
    })

    const total = amountRecurrent + amountEventual
    
    return [
      {
        name: 'Recorrentes',
        amount: amountRecurrent,
        percent: total !== 0 ? Number(((amountRecurrent / total) * 100).toFixed(1)) : 0,
        color: "#F7931B"
      },
      {
        name: 'Eventuais',
        amount: amountEventual,
        percent: total !== 0 ? Number(((amountEventual / total) * 100).toFixed(1)) : 0,
        color: "#E44C4E"
      }
    ]
  },[monthSelected, yearSelected])

  const relationGainsRecurrentVersusEventual = useMemo(() => {
    let amountRecurrent:number = 0
    let amountEventual:number = 0

    gains
    .filter((gain) => {
      const date = new Date(gain.date)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      return month === monthSelected && year === yearSelected

    })
    .forEach((gain) =>{
      if(gain.frequency === 'recorrente'){
        return amountRecurrent += Number(gain.amount)
      }

      if(gain.frequency === 'eventual'){
        return amountEventual += Number(gain.amount)
      }
    })

    const total = amountRecurrent + amountEventual
    
    return [
      {
        name: 'Recorrentes',
        amount: amountRecurrent,
        percent: total !== 0 ? Number(((amountRecurrent / total) * 100).toFixed(1)) : 0,
        color: "#F7931B"
      },
      {
        name: 'Eventuais',
        amount: amountEventual,
        percent: total !== 0 ? Number(((amountEventual / total) * 100).toFixed(1)): 0,
        color: "#E44C4E"
      }
    ]
  },[monthSelected, yearSelected])

  const historyData = useMemo(() => {
    return listOfMonths
      .map((_, month) => {
        let amountEntry: number = 0;

        gains.forEach((gain) => {
          const date = new Date(gain.date);
          const gainMonth = date.getMonth();
          const gainYear = date.getFullYear();
          if (gainMonth === month && gainYear === yearSelected) {
            try {
              amountEntry += Number(gain.amount);
            } catch {
              throw new Error("Amount Entry is invalid. It´s must a number.");
            }
          }
        });

        let amountOutput: number = 0;

        expenses.forEach((expense) => {
          const date = new Date(expense.date);
          const expenseMonth = date.getMonth();
          const expenseYear = date.getFullYear();
          if (expenseMonth === month && expenseYear === yearSelected) {
            try {
              amountOutput += Number(expense.amount);
            } catch {
              throw new Error("Amount Out is invalid. It must be a number.");
            }
          }
        });

        return {
          monthNumber: month,
          month: listOfMonths[month].substring(0, 3),
          amountEntry,
          amountOutput,
        };
      })
      .filter((item) => {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        return (
          (yearSelected === currentYear && item.monthNumber <= currentMonth) ||
          yearSelected < currentYear
        );
      });
  }, [yearSelected]);

  return (
    <Container>
      <ContentHeader title="Dashboard" lineColor="#F7931B">
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
          color="#4E41F0"
          title="saldo"
          amount={totalBalance}
          footerlabel="atualizado com base nas entradas e saídas"
          icon="dolar"
        />
        <WalletBox
          color="#F7931B"
          title="entradas"
          amount={totalGains}
          footerlabel="atualizado com base nas entradas e saídas"
          icon="arrowUp"
        />
        <WalletBox
          color="#E44C4E"
          title="saídas"
          amount={totalExpenses}
          footerlabel="atualizado com base nas entradas e saídas"
          icon="arrowDown"
        />
        <MessageBox
          title={message.title}
          description={message.description}
          footerText={message.footerText}
          icon={message.icon}
        />
        <PieChartBox data={relationExpensesVersusGains} />
        <HistoryBox
          data={historyData}
          lineColorAmountEntry="#F7931B"
          lineColorAmountOutput="#E44C4E"
        />
        <BarChartBox title= 'Saídas' data={relationExpensesRecurrentVersusEventual}/>
        <BarChartBox title= 'Entradas' data={relationGainsRecurrentVersusEventual}/>
      </Content>
    </Container>
  );
};

export default Dashboard;
