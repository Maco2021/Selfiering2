import React from "react";

const REVIEWS = [
  {
    photo: "/img/blog/1.webp",
    name: "Ana Venieru",
    text:
      "Ana Venieru - Vă mulțumim foarte mult pentru atmosfera creată. Este confortabil și ușor să lucrezi cu Dvs., ceea ce este destul de important și necesar pentru o muncă eficientă și un rezultat frumos ❤️ Cu mare drag vă recomandăm . Vă dorim succese în tot ce faceți!O faceți foarte bine❤️",
    className: "team__item",
  },
  {
    photo: "/img/blog/2.webp",
    name: "Djulia Gheorghina",
    text:
      "Mulțumim pentru serviciile oferite!!! Sunteți superbi și fotografiile sunt la nivel. Vă recomand cu încredere 🤩🤩🤩 succese",
    className: "team__item",
  },
  {
    photo: "/img/blog/3.webp",
    name: "Elena Trifan Chițanu",
    text:
      "Recomand cu încredere! Datorită Cabinei Foto Ring, am avut o petrecere mai interesantă. Am primit toate pozele în plic, magneți și un link cu pozele de la petrecere. Toate acestea la un preț mai bun decât la ceilalți care prestează astfel de servicii. Domnul cu Cabina Foto a avut răbdare cu noi atunci când am ales template-ul și am discutat toate detaliile și în timpul evenimentului a fost la dispoziția noastră atât timp cât am avut nevoie. Vă mulțumim pentru serviciile dumneavoastră!",
    className: "team__item",
  },
  {
    photo: "/img/blog/4.webp",
    name: "Georgiana Muntean",
    text:
      "Servicii de nota 10!😊 Mulțumim pentru serviciile voastre! Deși am discutat doar in modul virtual și nu ne-am întâlnit decât în ziua evenimentului, totul a mers foarte bine: calitatea pozelor, diverse animații pentru poze, mereu era cineva lângă cabina care ajuta persoanele în realizarea fotografiilor, amabilitate si pret bun! Mulțumim! Cu siguranță vă voi recomanda și altor persoane.🥳",
    className: "team__item",
  },
  {
    photo: "/img/blog/5.webp",
    name: "Andreea Galici",
    text:
      "Echipa care îți creează memorii pe viață! Servicii la superlativ!",
    className: "team__item1",
  },
  {
    photo: "/img/blog/6.webp",
    name: "Maria Ciobanu",
    text:
      "Mulțumim pentru lucru calitativ , cu toții am rămas plăcut surprinși . Din partea mea , aș dori să vă urez succes și să-mi exprim recunoștința pentru munca excelentă . Neapărat revenim la Dvs 🥰",
    className: "team__item2",
  },
  {
    photo: "/img/blog/7.webp",
    name: "Prisăcaru Valentina",
    text:
      "Super invenție pentru ați creea o petrecere frumoasă și deosebită ,cu amintiri în formă de poze interesante și de calitate . Recomand cu cea mai mare încredere .🥇❤️",
    className: "team__item3",
  },
  {
    photo: "/img/blog/8.webp",
    name: "Balanici Ion",
    text:
      "Recomand cu încredere și căldură, servicii de nota 10. Poze calitative , amintiri frumoase 🥳",
    className: "team__item4",
  },
];

export default function Reviews() {
  return (
    <div className="team" id="recenzii" data-testid="reviews-section">
      <div className="container">
        <div className="team__inner">
          {REVIEWS.map((r, idx) => (
            <div
              key={r.name}
              className={r.className}
              data-testid={`review-item-${idx}`}
            >
              <img
                style={{ borderRadius: 15 }}
                className="team__photo"
                src={r.photo}
                alt=""
              />
              <div className="team__name">{r.name}</div>
              <div className="team__text">
                <p>{r.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
