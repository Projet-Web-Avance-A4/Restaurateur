import React, { useState } from "react";
import { Button, Link, NextUIProvider, Tooltip } from "@nextui-org/react";
import { FaTrashCan } from "react-icons/fa6";
import { deteleArticle } from "./utils";
import { disabledArticlesList } from "../../article_page/page";

export default function ActionButtonDeleteArticle(item: any) {
  function deleteArticle() {
    deteleArticle(item.id);
    window.location.reload();
  }

  return (
    <NextUIProvider>
      <Tooltip
        className="text-black"
        content={ disabledArticlesList.includes(item.id) ? "Cet article est présent dans des menus existants." : "Êtes-vous sûr de vouloir supprimer cette article?"}
      >
        <span>
          <Button
            isDisabled={disabledArticlesList.includes(item.id)}
            isIconOnly
            radius="full"
            size="sm"
            variant="light"
            onClick={deleteArticle}
          >
            <FaTrashCan className="text-default-400 fill-red" />
          </Button>
        </span>
      </Tooltip>
    </NextUIProvider>
  );
}
