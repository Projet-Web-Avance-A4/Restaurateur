"use client";

import { NextUIProvider } from "@nextui-org/system";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import CustomTable from "../components/table/table";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { FaBoxesStacked } from "react-icons/fa6";
import { Options } from "../interfaces/table";
import { propsTable } from "@/app/interfaces/table";
import { useEffect, useState } from "react";
import { Order } from "../types/order";
import MoonLoader from "react-spinners/MoonLoader";
import { decodeAccessToken } from "../utils/utils";
import actionButtonStartOrder from "../components/actionButtonTable/actionButtonStartOrder"

export default function Home() {
  const [ordersList, setOrdersList] = useState<Order[]>([]);
  const [assignedOrder, setAssignedOrder] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const decoded = decodeAccessToken(accessToken)
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:4000/order/getOrders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        const filteredOrders = data.filter(
          (order: Order) => order.restaurant.restaurant_id === decoded?.id_user
        );
        setOrdersList(filteredOrders);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const INITIAL_VISIBLE_COLUMNS = [
    "status",
    "date",
    "commande",
    "price",
    "payment_method",
    "actions", //Always here
  ];

  const items = ordersList.map((item) => ({
    id: item.order_id, //We always need an unique id, but it is never shown. Make sure to used an unique key as value.
    status: item.order_status,
    date: new Date(item.estimated_delivery_time).toLocaleDateString(),
    commande : item.items.map((commande) => {return commande.name}).join(', '),
    payment_method: item.payment.method,
    price: item.price,
  }));

  const columns = [
    { name: "Etat de la commande", uid: "status", sortable: true },
    { name: "Date de la commande", uid: "date", sortable: true },
    { name: "Contenu de la commande", uid: "commande" },
    { name: "Prix de la commande", uid: "price" },
    { name: "Moyen de paiement", uid: "payment_method", sortable: true  },
    { name: "Actions", uid: "actions" }, //Always here
  ];

  const options: Options = {
    content: "commande(s) trouvée(s)", //Used for the number of items and when no items was found
    search_name: "Chercher par date ou par contenu de la commande", //Title of the search bar
    search_uid: ["date", "commande"], //ALWAYS AN ARRAY, uid of the column to filter
    selection_mode: "none", //"none", "single" or "multiple"
    option_name: "Etat de la commande", //Name of the option filter
    option_uid: "status", //ALWAYS A SINGLE STRING, uid of the column filtered with the option
    value_option: [
      { name: "Commande reçu", uid: "Commande reçu" }, // uid need to be exactly the same as item's value. Name is the string to be printed
      { name: "En cours de préparation", uid: "En cours de préparation" },
      { name: "En cours de livraison", uid: "En cours de livraison" },
      { name: "Commande livrée", uid: "Commande livrée" },
    ],
  };

  const props: propsTable = {
    columns: columns,
    options: options,
    items: items,
    INITIAL_VISIBLE_COLUMNS: INITIAL_VISIBLE_COLUMNS,
  };

  return (
    <NextUIProvider className="h-screen bg-beige flex flex-col">
      <Header title="Restaurateur" showMyAccount={true} showStats={false} />
      <main className="container mx-auto flex-grow">
        {loading && (
          <div className="flex justify-center m-14">
            <MoonLoader
              // color={blue}
              loading={true}
              // cssOverride={override}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}

        {assignedOrder.length && !loading && (
          <Card className="m-8">
            <CardBody className="text-black flex items-center">
              <p>Vous avez déjà une commande à réaliser</p>
            </CardBody>
          </Card>
        )}

        {!assignedOrder.length && !loading && (
          <Card className="m-8">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <h4 className="flex items-center font-bold text-large gap-2">
                <FaBoxesStacked />
                Votre suivi de Commandes
              </h4>
            </CardHeader>
            <CardBody>
              <CustomTable
                props={props}
                actionButtons={[actionButtonStartOrder]}
              />
            </CardBody>
          </Card>
        )}
      </main>
      <Footer />
    </NextUIProvider>
  );
}
