import {MainPage} from "@/pages/MainPage";
import React from "react";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Webcos — создание сервисов и блог о разработке",
    description:
        "Webcos — платформа, где создаются современные веб-сервисы и публикуется практический опыт разработки: Next.js, backend, архитектура и реальные кейсы.",

    openGraph: {
        title: "Webcos — начало чего-то нового",
        description:
            "Создаём сервисы, исследуем технологии и делимся опытом разработки.",
        url: "https://webcos.ru",
        type: "website",
    },

    alternates: {
        canonical: "https://webcos.ru",
    },
};

export default function Home() {
  return (
      <>
        <MainPage/>
      </>
  );
}
