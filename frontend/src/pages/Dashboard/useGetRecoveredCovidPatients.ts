import { format } from "date-fns";
import { useQuery, UseQueryResult } from "react-query";

export interface GetNumOfRecoveredCovidPatientsHook {
  startDate?: Date;
  endDate?: Date;
}

export interface GetRecoveredCovidPatientsResponse {
  parameter: string;
  sub_series_name: string;
  value: number;
}

const useGetNumOfRecoveredCovidPatients = ({
  startDate,
  endDate,
}: GetNumOfRecoveredCovidPatientsHook): UseQueryResult<
  GetRecoveredCovidPatientsResponse[],
  unknown
> => {
  return useQuery(["getNumOfRecoveredCovidPatients", startDate, endDate], () =>
    fetch(
      `http://localhost:8080/api/v1/covid/patients/recovered?startDate=${
        startDate && format(startDate, "yyyy/MM/dd")
      }&endDate=${endDate && format(endDate, "yyyy/MM/dd")}`
    ).then((res) => res.json())
  );
};

export default useGetNumOfRecoveredCovidPatients;
