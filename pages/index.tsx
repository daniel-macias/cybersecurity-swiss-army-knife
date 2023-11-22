import Head from 'next/head'
import Main from '../components/Main'


export default function Home() {
  return (
    <div>
      <Head>
        <title>Infosec MultiTool | Daniel Macías</title>
        <meta name="description" content="I’m a full-stack web developer specializing in building (and occasionally designing) exceptional digital experiences." />
        <link rel="icon" href="../public/favicon.ico" />
      </Head>
      <Main />
    </div>
  )
}