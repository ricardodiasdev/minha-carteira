import React from "react";

import { ResponsiveContainer, BarChart, Bar, Cell, Tooltip } from "recharts";
import formatCurrency from "../../utils/formatCurrency";

import {
  Container,
  Legend,
  LegendContainer,
  SideLeft,
  SideRight,
} from "./styles";

interface IBarChartProps {
  title: string;
  data: {
    name: string;
    amount: number;
    percent: number;
    color: string;
  }[];
}

const BarChartBox: React.FC<IBarChartProps> = ({ title, data }) => {
  return (
    <Container>
      <SideLeft>
        <h2>{title}</h2>
        <LegendContainer>
          {data.map((item) => (
            <Legend key={item.name} color={item.color}>
              <div>{item.percent}%</div>
              <span>{item.name}</span>
            </Legend>
          ))}
        </LegendContainer>
      </SideLeft>
      <SideRight>
        <ResponsiveContainer>
          <BarChart data={data}>
            <Tooltip
              cursor={{ fill: "none" }}
              formatter={(value) => formatCurrency(Number(value))}
            />
            <Bar dataKey="amount" name="valor">
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </SideRight>
    </Container>
  );
};

export default BarChartBox;
