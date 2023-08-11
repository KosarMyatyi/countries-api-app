import Image from "next/image";
import Link from "next/link";
import { Country } from "../../page";

async function getCountryByName(name: string): Promise<Country> {
  const responce = await fetch(
    `https://restcountries.com/v3.1/name/${name}?fullText=true`
  );
  const country = await responce.json();
  return country[0];
}

export default async function CountryDetail({
  params: { name },
}: {
  params: { name: string };
}) {
  const country = await getCountryByName(name)
  const formatter = Intl.NumberFormat('rus', {notation: "compact"})

  return (
    <section className="flex flex-col container">
      <h1 className="text-5xl font-bold text-center text-gray-800 mt-16">
        {country.translations.rus.official}
      </h1>
      <Link href="/" className="flex items-center py-2 gap-1">
        <Image src="/arrow.svg" alt="go back home" width={24} height={24} />
        Back
      </Link>

      <article className=" flex justify-between min-w-full p-10 bg-white rounded-xl">
        <section>
          {country.capital && (
          <h2 className="text-xl text-gray-800 mt-3">
            <b>🏙️ Столица:</b> {country.capital}
          </h2>
          )}
          {country.region && (
          <h2 className="text-xl text-gray-800 mt-3">
            <b>🗺️ Регион: </b> {country.region} {country.subregion && ` - ${country.subregion}`}
          </h2>
          )}
          {country.population && (
          <h2 className="text-xl text-gray-800 mt-3">
            <b>👨‍👩‍👧‍👦 Население: </b> {formatter.format(country.population)}
          </h2>
          )}
          {country.languages && (
          <h2 className="text-xl text-gray-800 mt-3">
            <b>🗣️ Язык:</b>
            {Object.values(country.languages).map((language) => (
              <span
                key={language}
                className="inline-block px-2 bg-indigo-700 mr-2 text-white text-sm rounded-full"
              >
                {language}
              </span>
            ))}
          </h2>
          )}
        </section>
      </article>
    </section>
  )
}