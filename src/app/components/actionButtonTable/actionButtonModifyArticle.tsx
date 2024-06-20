import React, { useState } from "react";
import { Button, Link, NextUIProvider, Tooltip } from "@nextui-org/react";
import { FaCheck } from "react-icons/fa6";

export default function ActionButtonModifyArticle(item: any) {

  return (
      <Tooltip className="text-black" content="Modifier l'Article">
        <Button
          as={Link}
          isIconOnly
          radius="full"
          size="sm"
          variant="light"
            href={`/modify_article?id=${item.id}`}
        >
            <FaCheck className="text-default-400 fill-green-500" />
        </Button>
      </Tooltip>
  );
}
