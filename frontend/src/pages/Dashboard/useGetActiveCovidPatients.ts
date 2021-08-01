import { format } from "date-fns";
import { useQuery, UseQueryResult } from "react-query";

export interface GetActiveCovidPatientsHook {
  startDate?: Date;
  endDate?: Date;
}

export interface GetActiveCovidPatientsResponse {
  parameter: string;
  sub_series_name: string;
  value: number;
  averagevalue: number;
}

// TODO: Base URL can be put in config
const useGetActiveCovidPatients = ({
  startDate,
  endDate,
}: GetActiveCovidPatientsHook): UseQueryResult<
  GetActiveCovidPatientsResponse[],
  unknown
> => {
  return useQuery(["getActiveCovidPatients", startDate, endDate], () =>
    fetch(
      `http://localhost:8080/api/v1/covid/patients/active?startDate=${
        startDate && format(startDate, "yyyy/MM/dd")
      }&endDate=${endDate && format(endDate, "yyyy/MM/dd")}`
    ).then((res) => res.json())
  );
};

export default useGetActiveCovidPatients;
