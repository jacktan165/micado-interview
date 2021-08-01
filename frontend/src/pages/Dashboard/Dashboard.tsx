import React, { useState, useMemo } from "react";
import * as CSS from "csstype";
import {
  Flex,
  Divider,
  FormControl,
  FormLabel,
  Spinner,
  Box,
  Circle,
  useBreakpointValue,
  ResponsiveValue,
} from "@chakra-ui/react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  Label,
} from "recharts";
import { format } from "date-fns";

import DatePicker from "../../components/DatePicker";
import GridLayout from "../../components/GridLayout";

import { breakpointsInPixels, Breakpoints } from "../../contexts/ThemeProvider";
import useGetActiveCovidPatients from "./useGetActiveCovidPatients";
import useGetRecoveredCovidPatients from "./useGetRecoveredCovidPatients";
import Tile from "../../components/Tile";
import useGetAverageActiveCovidPatients from "./useGetAverageActiveCovidPatients";

interface DashboardProps {
  defaultStartDate?: Date;
  defaultEndDate?: Date;
}

const defaultCols: Record<Breakpoints, number> = {
  xs: 2,
  sm: 4,
  md: 6,
  lg: 8,
  xl: 10,
  "2xl": 12,
};

const DashboardPage: React.FC<DashboardProps> = ({
  defaultStartDate = new Date("02/15/2021"),
  defaultEndDate = new Date("02/15/2021"),
}) => {
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [layouts, setLayouts] = useState({});

  const handleOnStartDateChange = (date: Date) => setStartDate(date);

  const handleOnEndDateChange = (date: Date) => setEndDate(date);

  const {
    isFetching: isLoadingAverageActiveCovidPatients,
    data: averageActiveCovidPatients,
  } = useGetAverageActiveCovidPatients({
    startDate,
    endDate,
  });

  const {
    isFetching: isLoadingActiveCovidPatients,
    data: activeCovidPatients,
  } = useGetActiveCovidPatients({
    startDate,
    endDate,
  });

  const {
    isFetching: isLoadingRecoveredCovidPatients,
    data: recoveredCovidPatients,
  } = useGetRecoveredCovidPatients({
    startDate,
    endDate,
  });

  const activeCovidPatientsBarChartData = useMemo(
    () =>
      activeCovidPatients?.map((patient) => ({
        name: format(new Date(patient.parameter), "yyyy/MM/dd"),
        numOfActiveCovidPatients: patient.value,
      })),
    [activeCovidPatients]
  );

  const recoveredCovidPatientsBarChartData = useMemo(
    () =>
      recoveredCovidPatients?.map((patient) => ({
        name: format(new Date(patient.parameter), "yyyy/MM/dd"),
        numOfRecoveredCovidPatients: patient.value,
      })),
    [recoveredCovidPatients]
  );

  const dateRangeControlMarginBottom = useBreakpointValue({
    xs: 3,
    sm: 3,
    md: 3,
    lg: 0,
    xl: 0,
  });

  const headerFlexDirection = useBreakpointValue({
    xs: "column",
    sm: "column",
    md: "column",
    lg: "row",
    xl: "row",
  }) as ResponsiveValue<CSS.Property.FlexDirection>;

  const headerAlignItems = useBreakpointValue({
    xs: "center",
    sm: "center",
    md: "center",
    lg: "flex-start",
    xl: "flex-start",
  }) as ResponsiveValue<CSS.Property.AlignItems>;

  const summaryMetricsOrder = useBreakpointValue({
    xs: 1,
    sm: 1,
    md: 1,
    lg: 0,
    xl: 0,
  });

  const isLoading = useMemo(
    () =>
      isLoadingAverageActiveCovidPatients ||
      isLoadingActiveCovidPatients ||
      isLoadingRecoveredCovidPatients,
    [
      isLoadingActiveCovidPatients,
      isLoadingAverageActiveCovidPatients,
      isLoadingRecoveredCovidPatients,
    ]
  );

  return (
    <Flex direction="column" bg="overlayPrimary" minHeight="100%">
      {isLoading ? <Spinner position="absolute" top="50%" left="50%" /> : null}
      <Flex bg="white" width="100%">
        <Flex
          maxWidth="1600"
          padding="3"
          justifyContent="space-between"
          width="100%"
          margin="0 auto"
          flexDirection={headerFlexDirection}
          alignItems={headerAlignItems}
        >
          <Flex alignItems="center" order={summaryMetricsOrder}>
            <Flex marginRight="3" direction="column" alignItems="center">
              <Box marginBottom={2}>Average active covid patients</Box>
              <Circle size="40px" bg="tomato" color="white" padding={6}>
                {averageActiveCovidPatients &&
                  averageActiveCovidPatients.length > 0 &&
                  Math.round(averageActiveCovidPatients[0].averagevalue)}
              </Circle>
            </Flex>
            <Flex direction="column" alignItems="center">
              <Box marginBottom={2}>Number of recovered covid patients</Box>
              <Circle size="40px" bg="tomato" color="white" padding={6}>
                {recoveredCovidPatientsBarChartData &&
                  recoveredCovidPatientsBarChartData.length > 0 &&
                  recoveredCovidPatientsBarChartData[
                    recoveredCovidPatientsBarChartData.length - 1
                  ].numOfRecoveredCovidPatients}
              </Circle>
            </Flex>
          </Flex>
          <Flex marginBottom={dateRangeControlMarginBottom}>
            <FormControl id="startDate" marginRight="3">
              <FormLabel>Start Date</FormLabel>
              <DatePicker
                onChange={handleOnStartDateChange}
                // This is only for this demo
                minDate={new Date("03/01/2020")}
                maxDate={new Date("02/15/2021")}
                value={startDate && format(startDate, "yyyy/MM/dd")}
                startDate={startDate}
                endDate={endDate}
                dateFormat="yyyy/MM/dd"
                placeholderText="Input your start date"
              />
            </FormControl>
            <FormControl id="endDate">
              <FormLabel>End Date</FormLabel>
              <DatePicker
                onChange={handleOnEndDateChange}
                minDate={new Date("03/01/2020")}
                maxDate={new Date("02/15/2021")}
                startDate={startDate}
                endDate={endDate}
                value={endDate && format(endDate, "yyyy/MM/dd")}
                dateFormat="yyyy/MM/dd"
                placeholderText="Input your end date"
              />
            </FormControl>
          </Flex>
        </Flex>
      </Flex>
      <Divider />
      <Flex padding="3" height="100%">
        <GridLayout
          breakpoints={breakpointsInPixels}
          cols={defaultCols}
          layouts={layouts}
          preventCollision
          compactType={null}
          onLayoutChange={(layout, updatedLayouts) => {
            setLayouts((prevLayouts) => ({
              ...prevLayouts,
              ...updatedLayouts,
            }));
          }}
          rowHeight={window.innerHeight / 6}
          maxRows={5}
          style={{ width: "100%" }}
        >
          <Tile
            key="numOfActiveCovidPatientsTile"
            data-grid={{
              x: 0,
              y: 0,
              w: 2,
              h: 2,
            }}
          >
            <ResponsiveContainer>
              <LineChart data={activeCovidPatientsBarChartData}>
                <XAxis dataKey="name">
                  <Label value="Date" position="insideBottom" offset={0} />
                </XAxis>
                <YAxis dataKey="numOfActiveCovidPatients">
                  <Label
                    angle={-90}
                    value="Number of active covid patients"
                    offset={0}
                    position="center"
                  />
                </YAxis>
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="numOfActiveCovidPatients"
                  fill="#8884d8"
                />
              </LineChart>
            </ResponsiveContainer>
          </Tile>
          <Tile
            key="numOfRecoveredCovidPatientsTile"
            data-grid={{
              x: 0,
              y: 1,
              w: 2,
              h: 2,
            }}
          >
            <ResponsiveContainer>
              <LineChart data={recoveredCovidPatientsBarChartData}>
                <XAxis dataKey="name">
                  <Label value="Date" offset={0} position="insideBottom" />
                </XAxis>
                <YAxis dataKey="numOfRecoveredCovidPatients">
                  <Label
                    angle={-90}
                    value="Number of recovered covid patients"
                    offset={0}
                    position="center"
                  />
                </YAxis>
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="numOfRecoveredCovidPatients"
                  fill="#8884d8"
                />
              </LineChart>
            </ResponsiveContainer>
          </Tile>
        </GridLayout>
      </Flex>
    </Flex>
  );
};

export default DashboardPage;
