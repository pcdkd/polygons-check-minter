import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Meta tags */}
          <meta name="description" content="A Checks-derviative, onchain art project on Polygon. Each Check minted contains a unique fingerprint. Art & metadata stored onchain." />
          <meta name="keywords" content="Polygons Check, Checks, onchain art, Polygon, NFT, art project" />
          <meta name="author" content="pcdkd" />
          <meta property="og:title" content="Polygons Check" />
          <meta property="og:type" content="app" />
          <meta property="og:url" content="https://www.polygons.wtf/" />
          <meta property="og:image" content="https://polygons.wtf/components/assets/polygons-check-blue.png" />
          <meta name="twitter:title" content="Polygons CHeck "/>
          <meta name="twitter:description" content="A Checks-derviative, onchain art project on Polygon. Each Check minted contains a unique fingerprint. Art & metadata stored onchain."/>
          <meta name="twitter:image" content="https://polygons.wtf/components/assets/polygons-check-blue.png"/>
          <meta name="twitter:card" content="summary_large_image"/>

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;700&display=swap" rel="stylesheet"/>

          {/* Heap Analytics script */}
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
              window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src="https://cdn.heapanalytics.com/js/heap-"+e+".js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a);for(var n=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],o=0;o<p.length;o++)heap[p[o]]=n(p[o])};heap.load("554426524");
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
