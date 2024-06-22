import React, { useState } from "react";
import { Button, Link, NextUIProvider, Tooltip } from "@nextui-org/react";
import { FaTrashCan } from "react-icons/fa6";
import { deteleArticle } from "./utils";

export default function ActionButtonDeleteArticle(item: any) {
  function deleteArticle() {
    deteleArticle(item.id);
    window.location.reload();
  }

  return (
      <Tooltip
        className="text-black"
        content={"Êtes-vous sûr de vouloir supprimer cette article?"}
      >
        <span>
          <Button
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
  );
}
