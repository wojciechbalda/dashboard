import axios from "axios";
import { useState } from "react";
import TitleComponent from "./Title";
import Container from "./Container";
import CryptocurrencyPricesChart from "./CryptocurrencyPricesChart";
import Loader from "./Loader";
import Message from "./Message";
import DashboardSectionFormComponent from "./DashboardSectionFormContainer";
import Input from "./Input";
import Button from "./Button";

export type CryptocurrencyChartDataType = {
  priceUsd: number;
  date: string;
}[];

const Cryptocurrency = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [cryptocurrencyName, setCryptocurrencyName] = useState("");
  const [chartData, setchartData] = useState<CryptocurrencyChartDataType>([]);

  async function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    const data = new FormData(e.currentTarget);
    const cryptocurrency = (data.get("cryptocurrency") as string).toLowerCase();
    if (cryptocurrency !== "") {
      const currentTimestamp = Date.now();
      try {
        const {
          data: { data: cryptocurrencyPriceData },
        }: { data: { data: CryptocurrencyChartDataType } } = await axios(
          `https://api.coincap.io/v2/assets/${cryptocurrency}/history?interval=m5&start=${
            currentTimestamp - 12 * 60 * 60 * 1000
          }&end=${currentTimestamp}`,
        );
        if (cryptocurrencyPriceData.length === 0)
          throw new Error(
            "Cryptocurrency was found but we have insufficient data to create a chart",
          );
        setCryptocurrencyName(cryptocurrency);
        setchartData(cryptocurrencyPriceData);
      } catch (err) {
        if (
          axios.isAxiosError(err) &&
          err.response &&
          err.response.status === 404
        )
          setErrorMessage(
            "Status: 404. The cryptocurrency might not exists or it is not in our database.",
          );
        else setErrorMessage("Something went wrong (error)");
      }
    } else {
      setErrorMessage("Error, value was not entered");
    }
    setIsLoading(false);
  }

  return (
    <Container>
      <TitleComponent>Cryptocurrency</TitleComponent>
      <DashboardSectionFormComponent onSubmit={handleSearch}>
        <Input
          name="cryptocurrency"
          id="crypto"
          placeholder="cryptocurrency id"
          type="text"
        />
        <Button type="submit">Search</Button>
      </DashboardSectionFormComponent>
      <div style={{ height: "230px" }}>
        {!errorMessage && !isLoading && chartData.length === 0 && (
          <Message>
            Enter cryptocurrency cryptocurrencyName into an input and then
            search. E.g. bitcoin
          </Message>
        )}
        {chartData.length !== 0 && !errorMessage && !isLoading && (
          <CryptocurrencyPricesChart
            cryptocurrencyName={cryptocurrencyName}
            cryptocurrencyData={chartData}
          />
        )}
        {isLoading && <Loader />}
        {errorMessage && <Message>{errorMessage}</Message>}
      </div>
    </Container>
  );
};

export default Cryptocurrency;
