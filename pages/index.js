import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });
    const data = await response.json();
    if (data?.result) {
      console.log('shubham RESPSONE DATA IN CLIENT: ', data.result.data)
      setResults(data.result.data);
      setQuery("");
    } else {
      console.log('shubham TRY SOMETHING ELSE')
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Get my match</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="query"
            placeholder="Enter a query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <input type="submit" value="Get matches" />
        </form>
        <div className={styles.result}>
          {results && results.map(result => {
            return <ul>
              <li>SCORE: {result.score}</li>
              <li>
                USER: {result.metadata.userId} <br />
              </li>
              <li>
                TEXT: {result.text}
              </li>
            </ul>
          })}
        </div>
      </main>
    </div>
  );
}
