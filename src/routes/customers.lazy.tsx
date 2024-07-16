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
      .get("http://localhost:3000/api/customer")
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
        <h2>Customers</h2>
        <CustomerGallery
          customers={customers}
          setCustomers={setCustomers}
        ></CustomerGallery>
      </div>
    </>
  );
}
