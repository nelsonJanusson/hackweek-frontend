import { createLazyFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { useState, useEffect } from "react";
import { CustomerDto } from "../types";
import { CustomerGallery } from "../components/CustomerGallery";
import { AddCustomerForm } from "../components/AddCustomerForm";

export const Route = createLazyFileRoute("/customers")({
  component: Customers,
});

function Customers() {
  const [customers, setCustomers] = useState<CustomerDto[]>([]);

  useEffect(() => {
    axios
      .get("https://hackweek-backend.azurewebsites.net/api/customer")
      .then((res) => res.data)
      .then((res) => setCustomers(res))
      .catch((error) => {
        console.log(error.response.data.error);
      });
  }, []);

  return (
    <>
      <div>
        <AddCustomerForm setCustomers={setCustomers}></AddCustomerForm>
        <CustomerGallery
          title="Customers"
          customers={customers}
          setCustomers={setCustomers}
        ></CustomerGallery>
      </div>
    </>
  );
}
