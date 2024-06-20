"use client";

import CustomTable from "../components/table/table";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { FaBoxesStacked } from "react-icons/fa6";
import { Options } from "../interfaces/table";
import { propsTable } from "@/app/interfaces/table";
import { useEffect, useState } from "react";
import { Order } from "../types/order";
import MoonLoader from "react-spinners/MoonLoader";
import { decodeAccessToken } from "../utils/utils";
import { dicoType } from "./utils";
import { Menu } from "../types/menu";
import { Article } from "../types/article";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState([]);
  const [menusList, setMenusList] = useState<Menu[]>([]);
  const [articlesList, setArticlesList] = useState<Article[]>([]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const decoded = decodeAccessToken(accessToken);
    const fetchStats = async () => {
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

        const itemsCount: any = {};

        filteredOrders.forEach((order: any) => {
          order.items.forEach((item: any) => {
            // console.log(item.id_menu || item.id_article)
            // console.log(item.category_article ? item.category_article : "menu")
            // console.log(item.name_article || item.name_menu)
            const itemId = item.id_menu || item.id_article;
            const itemType = item.category_article ? item.category_article : "menu"
            const itemName = item.name_article || item.name_menu;

            const key = `${itemId}-${itemType}`;

            if (!itemsCount[key]) {
              itemsCount[key] = {
                id: itemId,
                type: itemType,
                name: itemName,
                count: 0,
              };
            }

            itemsCount[key].count += 1;
          });
        });

        setStats(Object.values(itemsCount));
      } catch (err) {
        console.error(err);
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const INITIAL_VISIBLE_COLUMNS = [
    "name",
    "type",
    "count",
  ];

  const items = stats.map((item: any) => ({
    id: item.id, //We always need an unique id, but it is never shown. Make sure to used an unique key as value.
    name: item.name,
    type: dicoType[item.type as keyof typeof dicoType],
    count: item.count
  }));

  const columns = [
    { name: "Nom du produit", uid: "name"},
    { name: "Type du produit", uid: "type", sortable: true },
    { name: "Quantité commandé", uid: "count", sortable: true  },
  ];

  const options: Options = {
    content: "article(s) trouvé(s)", //Used for the number of items and when no items was found
    search_name: "Chercher par nom", //Title of the search bar
    search_uid: ["name"], //ALWAYS AN ARRAY, uid of the column to filter
    selection_mode: "none", //"none", "single" or "multiple"
    option_name: "Type du produit", //Name of the option filter
    option_uid: "type", //ALWAYS A SINGLE STRING, uid of the column filtered with the option
    value_option: [
      { name: "Menu", uid: "Menu" },
      { name: "Repas", uid: "Repas" }, // uid need to be exactly the same as item's value. Name is the string to be printed
      { name: "Boisson", uid: "Boisson" },
      { name: "Dessert", uid: "Dessert" },
    ],
  };

  const props: propsTable = {
    columns: columns,
    options: options,
    items: items,
    INITIAL_VISIBLE_COLUMNS: INITIAL_VISIBLE_COLUMNS,
  };

  return (
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

      {!loading && (
        <Card className="m-8">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <h4 className="flex items-center font-bold text-large gap-2">
              <FaBoxesStacked />
              Votre statistiques
            </h4>
            <Button onClick={() => console.log(stats)}>Test</Button>
          </CardHeader>
          <CardBody>
            <CustomTable props={props} actionButtons={[]} />
          </CardBody>
        </Card>
      )}
    </main>
  );
}
