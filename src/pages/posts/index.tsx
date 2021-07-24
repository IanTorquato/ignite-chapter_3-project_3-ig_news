import { GetStaticProps } from 'next';
import Head from 'next/head';
import Prismic from '@prismicio/client';

import { getPrismicClient } from '../../services/prismic';
import styles from './styles.module.scss';

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>23 de julho de 2021</time>

            <strong>Next.JS - Novidades na versão 10 e atualização do blog para melhorar a performance</strong>

            <p>
              Se você nos acompanhou nos últimos posts, já viu que criamos um blog com um contador de visitas usando o MongoDB e Next.js, depois adicionamos a funcionalidade de dark mode. Na semana passada aconteceu a Next.js Conf. Uma das surpresas foi o anúncio da versão 10, com várias melhorias. Vamos experimentar algumas dessas melhorias e aplicar na prática no blog que criamos para ir evoluindo com essa ferramenta que tem revolucionado a web.
            </p>
          </a>
          
          <a href="#">
            <time>23 de julho de 2021</time>

            <strong>Next.JS - Novidades na versão 10 e atualização do blog para melhorar a performance</strong>

            <p>
              Se você nos acompanhou nos últimos posts, já viu que criamos um blog com um contador de visitas usando o MongoDB e Next.js, depois adicionamos a funcionalidade de dark mode. Na semana passada aconteceu a Next.js Conf. Uma das surpresas foi o anúncio da versão 10, com várias melhorias. Vamos experimentar algumas dessas melhorias e aplicar na prática no blog que criamos para ir evoluindo com essa ferramenta que tem revolucionado a web.
            </p>
          </a>

          <a href="#">
            <time>23 de julho de 2021</time>

            <strong>Next.JS - Novidades na versão 10 e atualização do blog para melhorar a performance</strong>

            <p>
              Se você nos acompanhou nos últimos posts, já viu que criamos um blog com um contador de visitas usando o MongoDB e Next.js, depois adicionamos a funcionalidade de dark mode. Na semana passada aconteceu a Next.js Conf. Uma das surpresas foi o anúncio da versão 10, com várias melhorias. Vamos experimentar algumas dessas melhorias e aplicar na prática no blog que criamos para ir evoluindo com essa ferramenta que tem revolucionado a web.
            </p>
          </a>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query([
    Prismic.predicates.at('document.type', 'post')
  ], {
    fetch: ['post.title', 'post.content'],
    pageSize: 100
  });

  return {
    props: {

    }
  };
};
