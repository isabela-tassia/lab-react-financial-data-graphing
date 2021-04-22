import { Card, Dimmer, Loader, Select, Card } from "semantic-ui-react";
import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

const options = [
  { value: "USD", text: "USD" },
  { value: "EUR", text: "EUR" },
  { value: "GBP", text: "GBP" },
];

function App() {
  const [loading, setLoading] = useState(true);
  const [priceData, setPriceData] = useState(null);
  const [currency, setCurrency] = useState("USD");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        "https://api.coindesk.com/v1/bpi/currentprice.json"
      );
      const data = await res.json();
      setPriceData(data.bpi);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleSelect = (e, data) => {
    setCurrency(data.value);
  };

  return (
    <div className="App">
      <div className="nav" style={{ padding: 15, background: "gold" }}>
        Coindesk API Data
      </div>
      <div>
        {loading ? (
          <div>
            <Dimmer active inverted>
              <Loader>Loading</Loader>
            </Dimmer>
          </div>
        ) : (
          <>
            <div
              className="price-container"
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                width: 600,
                height: 300,
                margin: "0 auto",
              }}
            >
              <div className="form">
                <Select
                  placeholder="Select your currency"
                  onChange={handleSelect}
                  options={options}
                ></Select>
              </div>
              <div className="price">
                <Card>
                  <Cart.Content>
                    <Card.Header>{currency} Currency</Card.Header>
                    <Card.Description>
                      {priceData[currency].rate}
                    </Card.Description>
                  </Cart.Content>
                </Card.Description>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
