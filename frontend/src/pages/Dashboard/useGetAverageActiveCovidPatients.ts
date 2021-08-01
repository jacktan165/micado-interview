import { format } from "date-fns";
import { useQuery, UseQueryResult } from "react-query";

export interface GetAverageActiveCovidPatientsHook {
  startDate?: Date;
  endDate?: Date;
}

export interface GetAverageActiveCovidPatientsResponse {
  averagevalue: number;
}

// TODO: Base URL can be put in config
const useGetAverageActiveCovidPatients = ({
  startDate,
  endDate,
}: GetAverageActiveCovidPatientsHook): UseQueryResult<
  GetAverageActiveCovidPatientsResponse[],
  unknown
> => {
  return useQuery(["getAverageActiveCovidPatients", startDate, endDate], () =>
    fetch(
      `http://localhost:8080/api/v1/covid/patients/active/average?startDate=${
        startDate && format(startDate, "yyyy/MM/dd")
      }&endDate=${endDate && format(endDate, "yyyy/MM/dd")}`
    ).then((res) => res.json())
  );
};

export default useGetAverageActiveCovidPatients;
