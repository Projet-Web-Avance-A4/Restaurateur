"use client";

import { NextUIProvider } from "@nextui-org/system";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import CustomTable from "../components/table/table";
import { Button, Card, CardBody, CardHeader, Link } from "@nextui-org/react";
import { FaBoxesStacked } from "react-icons/fa6";
import { Options } from "../interfaces/table";
import { propsTable } from "@/app/interfaces/table";
import { useEffect, useState } from "react";
import { Article } from "../types/article";
import MoonLoader from "react-spinners/MoonLoader";
import { decodeAccessToken } from "../utils/utils";
import { capitalize } from "../utils/capitalize";
import ActionButtonModifyArticle from "../components/actionButtonTable/actionButtonModifyArticle";
import ActionButtonDeleteArticle from "../components/actionButtonTable/actionButtonDeleteArticle";
import { Menu } from "../types/menu";
import NotificationSponsorPoints from "../components/sponsorPoints/sponsorPoints";

export default function Home() {
  const [articlesList, setArticlesList] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const decoded = decodeAccessToken(accessToken);
    const fetchArticles = async () => {
      try {
        const response = await fetch("http://localhost:4000/article/getArticles", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        const filteredArticle = data.filter(
          (article: Article) => article.id_restorer === decoded?.id_user
        );
        setArticlesList(filteredArticle);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch menus.");
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const INITIAL_VISIBLE_COLUMNS = [
    "name",
    "price",
    "category",
    "actions", //Always here
  ];

  const items = articlesList.map((item: Article) => ({
    id: item.id_article, //We always need an unique id, but it is never shown. Make sure to used an unique key as value.
    name: item.name_article,
    price: item.price_article,
    category: capitalize(item.category_article),
  }));

  const columns = [
    { name: "Nom du Menu", uid: "name", sortable: true },
    { name: "Prix du Menu", uid: "price" },
    { name: "Type du Menu", uid: "category", sortable: true },
    { name: "Actions", uid: "actions" }, //Always here
  ];

  const options: Options = {
    content: "article(s) trouvé(s)", //Used for the number of items and when no items was found
    search_name: "Chercher par nom", //Title of the search bar
    search_uid: ["name"], //ALWAYS AN ARRAY, uid of the column to filter
    selection_mode: "none", //"none", "single" or "multiple"
    option_name: "Type d'article", //Name of the option filter
    option_uid: "category", //ALWAYS A SINGLE STRING, uid of the column filtered with the option
    value_option: [
      {name: "Repas", uid: "Repas"},
      {name: "Boisson", uid: "Boisson"},
      {name: "Dessert", uid: "Dessert"},
    ],// uid need to be exactly the same as item's value. Name is the string to be printed
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
            <CardHeader className="flex flex-row justify-between pb-0 pt-2 px-4 items-start">
              <h4 className="flex items-center font-bold text-large gap-2 ">
                <FaBoxesStacked />
                Vos Articles
              </h4>
              <Button
              as={Link}
              href="/modify_article"
              >Ajouter un nouvel article</Button>
            </CardHeader>
            <CardBody>
              <CustomTable
                props={props}
                actionButtons={[ActionButtonModifyArticle, ActionButtonDeleteArticle]}
              />
            </CardBody>
          </Card>
        )}
      </main>
  );
}
