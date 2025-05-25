import React from "react";

const Attractions = () => {
  const sights = [
    {
      title: "Чингис хааны морьт хөшөө",
      location: "Төв аймаг, Улаанбаатараас 55 км",
      image: "/picture-source/Chingishaan.jpg",
      description:
        "Монголын түүхэн удирдагчийг алдаршуулсан энэхүү хөшөө нь 40 метр өндөртэй бөгөөд хөшөөний дотор түүхийн музей, дээд талд нь 360° харагдах үзэгдэх цэгтэй. Аялагчид моринд сууж буй Чингис хааны гутлын завсраар дээш гарч үзэсгэлэнт талыг тольддог.",
    },
    {
      title: "Говь гурван сайхан цогцолборт газар",
      location: "Өмнөговь аймаг",
      image: "/picture-source/govi3.jpeg",
      description:
        "Монголын өмнөд бүсийн хамгийн алдартай аялал жуулчлалын бүс бөгөөд Ёлын амын мөсөн хавцал, Хонгорын дуулдаг элс, Баянзагийн үлэг гүрвэлийн олдвор зэрэг нь байгалийн гайхамшгийг харуулна. Адал явдал, түүх, элсэн цөл — бүгд нэг дор!",
    },
    {
      title: "Хөвсгөл нуур",
      location: "Хөвсгөл аймаг, Мөрөн хотоос 100 км",
      image: "/picture-source/huvsgulnuur.jpg",
      description:
        "Азийн Швейцарь гэгддэг Хөвсгөл нуур нь дэлхийн цэвэр усны 1%-ийг агуулдаг. Уул, ой мод, цэнгэг усны хослол бүхий энэ нуур нь завиар зугаалах, явган аялал, морин аялал, өвлийн мөсөн баярт оролцоход төгс газар юм.",
    },
  ];

  return (
    <div className="bg-gray-100 py-10 px-4 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-10">
        Монголын шилдэг 3 үзвэр
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {sights.map((sight, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden min-h-[520px] flex flex-col"
          >
            <div className="aspect-[4/3] overflow-hidden w-full">
              <img
                src={sight.image}
                alt={sight.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <h2 className="text-xl font-semibold mb-2">{sight.title}</h2>
              <p className="text-sm text-gray-500 mb-2">{sight.location}</p>
              <p className="text-gray-700 text-justify leading-loose flex-grow">
                {sight.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Attractions;
