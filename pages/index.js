import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import styles from '../styles/Main.module.css'

export default function Home() {
  const [ipsumDat, setIpsumDat] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [values, setValues] = useState({count: 5, includeQuotes: true});
  const [paragraphs, setParagraphs] = useState([]);
  const handleInputChange = e => {
    const {name} = e.target;
    const data = e.target.type == "checkbox" ? e.target.checked : e.target.value;
    setValues({...values, [name]: data});
  }
  const getRandomInt = (max) => {
    return (Math.floor(Math.random() * Math.floor(max)));
  }
  const generate = e => {
  
    let paragraphs = [];
    for (let i = 0; i < values.count; i++) {
      let paragraph = "";
      const sentences = getRandomInt(10);
      sentences = sentences < 3 ? 3: sentences;
      
      for (let s = 0; s < sentences; s++) {
        if (values.includeQuotes && getRandomInt(10) < 3) {
           paragraph += ipsumDat.quotes[getRandomInt(ipsumDat.quotes.length)];
           paragraph += " ";
        } else {
          let sentence = "";
          let words = getRandomInt(10);
          words = words < 5 ? 5 : words;
          console.log("Words: " + words);
          for(let w = 0; w < words; w++){
            sentence += ipsumDat.words[getRandomInt(ipsumDat.words.length)]
            sentence += " ";
          }
          sentence = sentence.replace(/\s+$/, '') + '. ';
          paragraph += sentence;
        }
      }
      paragraphs[i] = paragraph;
    }
    if (paragraphs.length > 0) {
      paragraphs[0] = "Lorem ipsum " + paragraphs[0];
    }
    setParagraphs(paragraphs);

  }
   

  useEffect(() => {
    fetch("/ipsum.json")
    .then(res =>  res.json())
    .then(jsonData =>  setIpsumDat(jsonData))
    .catch(err => {
      console.log(err);
      setHasError(true)
    })
  } , [])

  
  if (hasError) {
    return <div>
      Oh Snap! Something unexpected happened. Please try again;
    </div>
  }
  
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Tesla Ipsum</title>
        <meta name="description" content="Tesla focused Lorem Ipsum Generator. Tesla Ipsum filler."/>
        </Head>
      <div className={styles.content}>

      <header className={styles.header} role="img" aria-label="Tesla Model 3 Cars"> 
        <h1><a href="#" id="logo">Tesla Ipsum</a></h1>
      </header>
      
      <div className={styles.main}>
        
        <article>
          <div className={styles.formContainer}>
            <div >
              Paragraphs
            </div>
            <div >
              <input type="number" min="1" max="10" value="5" 
                    name="count"
                    onChange={handleInputChange}
                    value={values.count} />
            </div>
   
            <div >
              Musk Quotes?
            </div>
            <div >
              <input type="checkbox" name="includeQuotes"
                    onChange={handleInputChange}
                    checked={values.includeQuotes} />
            </div>
            <div></div>
            <div >
              <button className="button small" onClick={generate}>Generate</button>
            </div>      
          </div>
     

          {paragraphs.length > 0 &&
          <div>
            {paragraphs.map( (p, i) => {
              return <p key={i}>{p}</p>

            })}

          </div>

          }  
        </article>
        
        <nav className={styles.nav}></nav>
        <aside className={styles.aside}></aside>
      </div>
      </div>
      <footer className={styles.footer}>
        <div>
          Starguy Software © {new Date().getFullYear()}
        </div>
      </footer>
    

    </div>
  )
}
